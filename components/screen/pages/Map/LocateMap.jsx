import styled from "./locateMap.module.css";

export const LocateMap = () => {
  return (
    <div className={styled.locate__map__wrapper}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1377.0732865187697!2d48.032404100935366!3d46.34663530625108!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x41a9057f1a4cbc37%3A0x6899c08557aac1b4!2z0JvRjtGC0LjQug!5e0!3m2!1sru!2sru!4v1706780227772!5m2!1sru!2sru"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};
