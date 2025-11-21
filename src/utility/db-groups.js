import { supabase } from "./supabase";

export const getUserGroupsByUserId = async ({ user_id }) => {
  const userGroupsQuery = supabase
    .from('group_member')
    .select(`
      group_id(group_id, group_name, group_image, color_id(color_hex))
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