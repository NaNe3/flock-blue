import { createUserPlanFromGroup } from "./db-plan";
import { organizeGroupData } from "./db-relationship";
import { supabaseGroupMember } from "./format";
import { supabase } from "./supabase";

export const getUserGroupsByUserId = async ({ user_id }) => {
  const userGroupsQuery = supabase
    .from('group_member')
    .select(`
      group_id(group_id, group_name, group_image, color_id(color_hex), plan_id)
    `)
    .eq('status', 'accepted')
    .eq('user_id', user_id);

  const { data, error } = await userGroupsQuery;
  if (error) {
    console.error('Error loading user groups:', error);
    return { data: null, error }
  }


  const groups = data.map(item => ({
      group_id: item.group_id.group_id,
      group_name: item.group_id.group_name,
      group_image: item.group_id.group_image,
      color_hex: item.group_id.color_id.color_hex,
      plan_id: item.group_id.plan_id,
    })) || [];
  return { data: groups, error: null }
}

export const getGroupsMembersByGroupId = async ({ group_id }) => {
  const { data, error } = await supabase
    .from('group_member')
    .select(`
      user_id(id, full_name, avatar_path),
      is_leader, group_member_id, status,
      role(group_member_role_id, role_name)
    `)
    .eq('group_id', group_id);

  if (error) {
    console.error('Error loading group members:', error);
    return { data: null, error }
  }

  const groupMembers = data.map(item => {
    const { user_id, ...rest } = item;
    return {
      ...user_id,
      ...rest,
    }
  });

  return { data: groupMembers, error: null }
}

export const getPendingGroupInvitesByGroupId = async ({ group_id }) => {
  const { data, error } = await supabase
    .from('group_invite')
    .select(`recipient_id`)
    .eq('group_id', group_id)

  return { data, error }
}

export const sendGroupInvite = async ({ group_id, recipient_id, sender_id }) => {
  const { error } = await supabase
    .from('group_invite')
    .insert([{
      group_id,
      recipient_id,
      sender_id,
    }]);

  return { error }
}

export const updateGroupName = async ({ group_id, new_name }) => {
  const { data, error } = await supabase
    .from('group')
    .update({ group_name: new_name })
    .eq('group_id', group_id)
    .select('group_name')
    .single();

  return { data, error }
}

export const identifyActiveGroupInviteCode = async ({ group_id }) => {
  const { data, error } = await supabase
    .from('group_invite_code')
    .select('*')
    .eq('group_id', group_id)
    .gt('expires_at', new Date().toISOString())
    .single();

  if (error) {
    console.error('Error fetching active group invite code:', error);
    return { data: null, error }
  }

  return { data, error }
}

export const createActiveGroupInviteCode = async ({ groupId, inviteCode, expiresAt }) => {
  const { data, error } = await supabase
    .from('group_invite_code')
    .insert([{
      group_id: groupId,
      invite_code: inviteCode,
      expires_at: expiresAt,
    }])
    .select('*')
    .single();

  if (error) {
    console.error('Error creating active group invite code:', error);
    return { data: null, error }
  }

  return { data, error }
}

export const getGroupFromInviteCode = async ({ inviteCode }) => {
  const { data, error } = await supabase
    .from('group_invite_code')
    .select(`
      group_id(
        group_id, group_name, group_image, color_id(color_hex)
      )
    `)
    .eq('invite_code', inviteCode)
    .single();

  if (error) {
    console.error('Error fetching group from invite code:', error);
    return { data: null, error }
  }

  return { data: data.group_id, error: null }
}

export const getGroupByCode = async (groupCode, userId) => {
  const { data, error } = await supabase
    .from('group_invite_code')
    .select(`group(group_id, group_name, group_image)`)
    .eq('invite_code', groupCode)
    // .gt('expires_at', new Date().toISOString())
    .single()

  if (!error) {
    const { group } = data

    // get first 3 avatars, member count, and check membership in parallel
    const [
      { data: threeAvatarsData },
      { count },
      { data: isMember }
    ] = await Promise.all([
      supabase
        .from('group_member')
        .select('user_id(avatar_path)')
        .eq('group_id', group.group_id)
        .limit(3),
      supabase
        .from('group_member')
        .select('user_id(avatar_path)', { count: 'exact' })
        .eq('group_id', group.group_id),
      supabase
        .from('group_member')
        .select('user_id')
        .eq('group_id', group.group_id)
        .eq('user_id', userId)
        .single()
    ])

    const refined = {
      ...group,
      avatars: threeAvatarsData ? threeAvatarsData.map(avatar => avatar.user_id) : [],
      memberCount: count || 0,
      isMember: !!isMember
    }
    return { data: refined, error: null }
  } else {
    return { data: null, error }
  }
}

export const joinGroup = async ({ groupId, userId, groupInviteId}) => {
  // create group member row
  const { error } = await supabase
    .from('group_member')
    .insert([
      { group_id: groupId, user_id: userId, status: 'accepted', role: 2 }
    ])

  if (!error) { 
    // create user plan from group (if applicable)
    const { data: plan } = await createUserPlanFromGroup({ groupId, userId })

    // if group invite exists, delete it
    if (groupInviteId) {
      const { error } = await supabase
        .from('group_invite_code')
        .delete()
        .eq('group_invite_id', groupInviteId)
      
      if (error) {
        console.error('Error deleting group invite code:', error)
      }
    }

    // get group data to return subsequently
    const { data: group, error: groupDataError } = await getGroupWithMembersById(userId, groupId)
    return { group, plan, error: groupDataError }
  } else {
    console.error('Error joining group:', error)
    return { data: null, error }
  }
}

export const getGroupWithMembersById = async (userId, groupId) => {
  const { data, error } = await supabase
    .from('group_member')
    .select(supabaseGroupMember)
    .eq('group_id', groupId)
  
  if (!error) {
    const groupedData = organizeGroupData(userId, data)
    return { data: groupedData[0], error: null }
  }
}
