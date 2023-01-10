const Footer = () => {
  return (
    <div className={`
    w-full
    bg-kernel py-5
    font-secondary
    text-primary-muted
    `}>
      <div className="flex flex-row justify-center items-center">
        <span className="lowercase">
        Built at&nbsp;
          <a
            href="https://kernel.community/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary uppercase"
          >
        KERNEL
          </a>
        </span>
      </div>
      {/* <div className="text-xs flex flex-row gap-3 justify-center italic font-primary font-thin px-4">
        <span>
          If this looks like something you&apos;d like to work on (we need tons of help)&nbsp;
          <a href="mailto:angela@kernel.community" className="underline">
          please get in touch!
          </a>
        </span>
      </div> */}
    </div>
  );
};

export default Footer;
