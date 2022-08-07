import React, { forwardRef, useEffect, useMemo, useState } from "react";
import s from "./sticky.module.css";

export interface TienStickyProps {
  //Props for the "TienStickyScroll"

  /**
   * Do not recommend using `id` attribute. Should use only to change background, padding, color of sticky.
   * The [HTML `id`][1] attribute. This set the value of element's id
   * content attribute.
   *
   * [1]: https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id
   */
  id?: string;

  children?: React.ReactNode;

  /**
   * Place sticky in top-left/top-right/bottom-left/bottom-right. Default is "bottom-right"
   */
  stickyPosition?: "top-left" | "top-right" | "bottom-left" | "bottom-right";

  /**
   * Visible value of sticky in controlled mode.
   */
  isShowSticky?: boolean;

  /**
   * Decide if the sticky will expand or not in a controlled mode.
   */
  isExpandSticky?: boolean;

  /**
   * Set width of the sticky using CSS width. Default width is 300px.
   */
  stickyWidth?: number | string;

  /**
   * Set height of the sticky using CSS height. Default height is 200px.
   */
  stickyHeight?: number | string;

  /**
   * Set width of the expanded sticky using CSS width. Default expanded width is 400px.
   */
  expandStickyWidth?: number | string;

  /**
   * Set height of the expanded sticky using CSS height. Default expanded height is 300px.
   */
  expandStickyHeight?: number | string;

  /**
   * Set the header of the sticky. You can use HTML elements to display some buttons that can close or expand the sticky.
   */
  headerSticky?: React.ReactNode;

  /**
   * Do not recommend using `className` attribute. Should use only to change background, padding, color of sticky.
   * The [HTML `className`][1] attribute. This set the value of element's class
   * content attribute.
   *
   * [1]: https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/class  */
  className?: string;

  /**
   * Do not recommend using `style` attribute. Should use only to change background, padding, color of sticky.
   * The [ReactJS `style`][1] attribute. This set the value of element's style
   * content attribute.
   *
   * [1]: https://reactjs.org/docs/dom-elements.html#style */
  style?: React.CSSProperties;
}

const getStyleProperties = (props: TienStickyProps): React.CSSProperties => {
  let styles: React.CSSProperties = {};

  if (props.style) {
    styles = { ...styles, ...props.style };
  }

  switch (props.stickyPosition) {
    case "top-left":
      styles = { ...styles, top: "20px", left: "20px" };
      break;
    case "top-right":
      styles = { ...styles, top: "20px", right: "20px" };
      break;
    case "bottom-left":
      styles = { ...styles, bottom: "20px", left: "20px" };
      break;
    case "bottom-right":
      styles = { ...styles, bottom: "20px", right: "20px" };
      break;

    default:
      styles = { ...styles, bottom: "20px", right: "20px" };
      break;
  }

  return styles;
};

const getClassName = (props: TienStickyProps): string => {
  const classes = [s.sticky];
  if (props.className) {
    classes.push(props.className);
  }

  return classes.join(" ");
};

const TienStickyRender = (
  props: TienStickyProps,
  ref: React.ForwardedRef<React.ReactNode>
): JSX.Element => {
  const styles = getStyleProperties(props);

  const [isStickyFloat, setIsStickyFloat] = useState<boolean>(
    typeof props.isShowSticky === "boolean" ? props.isShowSticky : true
  );
  const [isExpandSticker, setIsExpandSticker] = useState<boolean>(
    typeof props.isExpandSticky === "boolean" ? props.isExpandSticky : false
  );

  const getStickyWidthHeight = useMemo(() => {
    let width: string | number = "300px";
    let height: string | number = "200px";
    if (props.stickyWidth) {
      width = props.stickyWidth;
    }
    if (props.stickyHeight) {
      height = props.stickyHeight;
    }
    if (isExpandSticker) {
      if (props.expandStickyWidth) {
        width = props.expandStickyWidth;
      } else {
        width = "400px";
      }
      if (props.expandStickyHeight) {
        height = props.expandStickyHeight;
      } else {
        height = "300px";
      }
    }

    return { width, height };
  }, [
    props.stickyWidth,
    props.stickyHeight,
    isExpandSticker,
    props.expandStickyWidth,
    props.expandStickyHeight,
  ]);

  useEffect(() => {
    if (typeof props.isShowSticky === "boolean") {
      setIsStickyFloat(props.isShowSticky);
    }
  }, [props.isShowSticky]);

  useEffect(() => {
    if (typeof props.isExpandSticky === "boolean") {
      setIsExpandSticker(props.isExpandSticky);
    }
  }, [props.isExpandSticky]);

  return (
    <div ref={ref as any}>
      <div
        className={isStickyFloat ? getClassName(props) : ""}
        style={
          isStickyFloat
            ? {
                ...styles,
                width: getStickyWidthHeight.width,
                height: getStickyWidthHeight.height,
              }
            : {}
        }
        id={props.id}
      >
        {isStickyFloat && props.headerSticky ? props.headerSticky : null}

        <div>{props.children && props.children}</div>
      </div>
    </div>
  );
};

export const TienSticky = forwardRef(TienStickyRender);
