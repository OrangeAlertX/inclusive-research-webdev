import { FaGithub } from 'react-icons/fa';

interface IGitHubLink {
  href: string;
}

export default function GitHubLink(props: IGitHubLink) {
  const { href } = props;

  return (
    <a target="_blank" href={href}>
      <FaGithub size={'2em'} />
    </a>
  );
}
