import Link from "next/link";

const LinkMenuBtn = ({ title, href }: { title: string; href: string }) => {
  return (
    <Link
      href={href}
      className="relative inline-block
             after:content-[''] after:absolute after:left-0 after:bottom-0
             after:w-full after:h-[2px] after:bg-current
             after:origin-left after:scale-x-0
             after:transition-transform after:duration-500
             hover:after:scale-x-100"
    >
      {title}
    </Link>
  );
};

export default LinkMenuBtn;
