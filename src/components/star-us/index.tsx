import React, { useEffect, useState } from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import useBaseUrl from "@docusaurus/useBaseUrl";

interface RefObject<T> {
  readonly current: T | null
}
let starUsAnchorRef; // reference to the anchor, at which's Y position the notification should show

export const StarUsAnchor = React.forwardRef((props, ref: RefObject<null>) => {
  starUsAnchorRef = ref;
  return <div {...props} ref={ref} />;
});

function StarUsNotification(props, ref) {
  const [starUsNotificationShown, setStarUsNotificationShown] = useState(false);
  const [starUsAnchorPosition, setStarUsAnchorPosition] = useState(1000);
  const offsetY = props.offsetY?? 0;

  useEffect(() => {
    const dimensions = starUsAnchorRef.current?.getBoundingClientRect();
    setStarUsAnchorPosition(dimensions.y + offsetY + window.scrollY); // add window.scrollY so position is also correct on refresh

    const onScroll = () => {
      const scrollCheck = window.scrollY >= starUsAnchorPosition;
      setStarUsNotificationShown(scrollCheck);
    };

    document.addEventListener("scroll", onScroll);
    return () => {
      document.removeEventListener("scroll", onScroll);
    };
  }, [starUsAnchorRef]);

  return (
    <div className={clsx(styles.starUsNotification, (starUsNotificationShown ? styles.starUsNotificationShow : null))}>
      <div className={clsx(styles.starUsNotificationSticky)}>
        <div className={clsx(styles.starUsNotificationStickyPointer)}>
          <img src={useBaseUrl("img/icons/icon-caret-up.svg")} />
        </div>
        <div className={clsx(styles.starUsNotificationStickyContent)}>
          <img src={useBaseUrl("img/icons/icon-emoticon-smiley-stars.svg")} /> Star us on Github!
        </div>
      </div>
    </div>
  );
}

export default StarUsNotification;