export default function useGroup () {
  // UPDATE GROUP INFO(IMAGE/NAME)!
  const updateGroupData = async (groupData, groupId, updateType) => {}

  // REMOVE GROUP MEMBERS!
  const removeGroupMember = async (userId, groupId) => {}

  return {
    updateGroupData,
    removeGroupMember
  }
}
