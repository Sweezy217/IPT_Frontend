import { useEffect } from "react";
import { useTeamMemberContext } from "../hooks/useTeamMemberContext";
import { fetchTeamMembers } from "../apis/Apis";

// Custom hook to fetch team members
export const useFetchTeamMembers = (workspaceName, members) => {
  const { teamMembers, setTeamMembers } = useTeamMemberContext();
  useEffect(() => {
    const fetchData = async () => {
      if (members?.length) {
        setTeamMembers(members);
        return;
      }

      if (!teamMembers?.length) {
        try {
          const [data, err] = await fetchTeamMembers(workspaceName);
          if (!err) {
            setTeamMembers(data);
          }
        } catch (error) {
          console.error("Error fetching team members:", error);
        }
      }
    };

    fetchData();
  }, [teamMembers?.length, members, workspaceName]);

  return teamMembers;
};
