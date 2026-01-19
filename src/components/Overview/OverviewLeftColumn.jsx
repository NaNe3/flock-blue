import AuxiliaryColumn from "../AuxiliaryColumn";
import GroupCodePrompt from "../Group/GroupCodePrompt";
import GroupListView from "../GroupListView";

export default function OverviewLeftColumn() {
  return (
    <AuxiliaryColumn border={false}>
      <GroupCodePrompt />
      <GroupListView />

    </AuxiliaryColumn>
  )
}

const styles = {
  addGroupContainer: {

  },
}