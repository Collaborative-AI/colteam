



function ProjectItem (props) {
  const {
    projectName,
    ownerName
  } = props

  return (
    <>
      <p>{projectName}</p>
      <p>{ownerName}</p>
    </>
  )
}

export default ProjectItem