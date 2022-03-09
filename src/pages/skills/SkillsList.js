import { useEffect, useState, useCallback } from "react";
import SkillTable from "./SkillTable";

const SkillsList = () => {
  const [skills, setSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSkillsHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://6195285474c1bd00176c6be7.mockapi.io/skills"
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();

      const loadedSkills = [];
      for (const key in data) {
        loadedSkills.push({
          id: data[key].id,
          name: data[key].name,
          image: data[key].image,
        });
      }
      setSkills(loadedSkills);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchSkillsHandler();
  }, [fetchSkillsHandler]);

  let content = <p>Found no skills</p>;

  if (skills.length > 0) {
    content = <SkillTable skills={skills} />;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  return <>{content}</>;
};

export default SkillsList;
