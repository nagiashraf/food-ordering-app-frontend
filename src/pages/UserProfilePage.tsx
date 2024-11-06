import { useGetUser, useUpdateUser } from "@/api/UserApi";
import UserProfileForm from "@/forms/user-profile-form/UserProfileForm";

const UserProfilePage = () => {
  const { user, isPending: isGetPending } = useGetUser();
  const { updateUser, isPending: isUpdatePending } = useUpdateUser();

  if (isGetPending) {
    return <span>Loading...</span>
  }

  if (!user) {
    return <span>Unable to load user profile</span>
  }

  return (
    <UserProfileForm user={user} onSave={updateUser} isLoading={isUpdatePending} />
  );
};

export default UserProfilePage;