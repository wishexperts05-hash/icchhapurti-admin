import React, { useEffect } from 'react'
import useStoriesSection from '../../../../hooks/appManagement/useStoriesSection'

const StoriesSection = () => {
  const { stories, fetchAllStories } = useStoriesSection();

  useEffect(() => {
    fetchAllStories();
  }, []);
  console.log("stories", stories);

  return (
    <div>storiesSection</div>
  )
}

export default StoriesSection