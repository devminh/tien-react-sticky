import React, { useEffect, useMemo, useRef, useState } from "react";
import s from "./sticky-scroll.module.css";

import HideIcon from "../icons/circle.svg";
import ExpandIcon from "../icons/expand.svg";

export interface TienStickyScrollProps {
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
   * Set width of the sticky using CSS width. Default width is 300px.
   */
  stickyWidth?: number | string;

  /**
   * Set height of the sticky using CSS height. Default height is 200px.
   */
  stickyHeight?: number | string;

  /**
   * Show sticky when scroll to X% of the original element's height. Default showStickyAt is 0.
   * showStickyAt is an interger that ranges from 0 - 100.
   */
  showStickyAt?: NumberRange;

  /**
   * Show the expand icon
   */
  isShowExpandIcon?: boolean;

  /**
   * Show the hide icon
   */
  isShowHideIcon?: boolean;

  /**
   * If true, the sticky will be constantly remained after scrolling below the origin element.
   * If you click close icon, the sticky will be permanent disappeared. Use resetStickyState prop to reset sticky to its initial state.
   */
  isManualCloseSticky?: boolean;

  /**
   * Use to reset the initial state of sticky. Use it as controlled mode, with default = 0
   * For example, you click close icon when set isManualCloseSticky={true}, use resetStickyState with incremental value is the same as reload page.
   */
  resetStickyState?: number;

  /**
   * Set width of the expanded sticky using CSS width. Default expanded width is 400px.
   */
  expandStickyWidth?: number | string;

  /**
   * Set height of the expanded sticky using CSS height. Default expanded height is 300px.
   */
  expandStickyHeight?: number | string;

  /**
   * Callback when click close icon. For example, use for pause/stop video.
   */
  callbackOnCloseSticky?: (isCloseSticky: boolean) => void;

  /**
   * Replace default Font Awesome <ExpandIcon />. You can use HTML elements such as <img /> or <svg>.
   */
  expandIcon?: React.ReactNode;

  /**
   * Replace default Font Awesome <HideIcon />. You can use HTML elements such as <img /> or <svg>.
   */
  hideIcon?: React.ReactNode;

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

type ComputeRange<
  N extends number,
  Result extends Array<unknown> = []
> = Result["length"] extends N
  ? Result
  : ComputeRange<N, [...Result, Result["length"]]>;

//0 to 100
type NumberRange = ComputeRange<101>[number];

enum StickyShowTypes {
  INITIAL = "INITIAL",
  SHOW = "SHOW",
  NONE = "NONE",
  NONEONCLOSE = "NONEONCLOSE",
}

const getStyleProperties = (
  props: TienStickyScrollProps
): React.CSSProperties => {
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

const getClassName = (props: TienStickyScrollProps): string => {
  const classes = [s.sticky];
  if (props.className) {
    classes.push(props.className);
  }

  return classes.join(" ");
};

const debounce = <T extends (...args: any[]) => ReturnType<T>>(
  callback: T,
  timeout: number
): ((...args: Parameters<T>) => void) => {
  let timer: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(...args);
    }, timeout);
  };
};

export const TienStickyScroll = (props: TienStickyScrollProps): JSX.Element => {
  const containerRef = useRef<HTMLDivElement>(null);
  const styles = getStyleProperties(props);

  const [stickyState, setStickyState] = useState<StickyShowTypes>(
    StickyShowTypes.INITIAL
  );
  const [isExpandSticker, setIsExpandSticker] = useState<boolean>(false);

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

  const getInitialHeight = () => {
    //use the initial height of parent div in DOM, avoid change height when scrolling
    if (containerRef.current) {
      return containerRef.current.offsetHeight;
    }
    return "auto";
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        const [entry] = entries;
        const bcr = entry.boundingClientRect;

        // console.log("bcr.bottom", bcr.bottom);
        // console.log("window.innerHeigh", window.innerHeight);

        // bottom < 0 => not in view port
        //bottom > window.innerHeight => not in view port
        const isInViewPort = entry.isIntersecting;

        if (
          props.isManualCloseSticky &&
          stickyState === StickyShowTypes.NONEONCLOSE
        ) {
          return;
        }

        if (isInViewPort) {
          setStickyState(StickyShowTypes.NONE);
        } else {
          if (bcr.bottom > window.innerHeight) {
            if (
              props.isManualCloseSticky &&
              stickyState !== StickyShowTypes.INITIAL
            ) {
              //keep sticky when scroll above the origin element's viewport
              debounce(setStickyState, 400)(StickyShowTypes.SHOW);
            }
          } else {
            // trigger sticky float when scrolling under element's viewport (bcr.bottom <= window.innerHeight)
            if (stickyState !== StickyShowTypes.NONEONCLOSE) {
              debounce(setStickyState, 400)(StickyShowTypes.SHOW);
            }
          }
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: props.showStickyAt ? (100 - props.showStickyAt) / 100 : 1,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(containerRef.current);
      }
    };
  }, [props, stickyState]);

  useEffect(() => {
    if (props.resetStickyState) {
      setStickyState(StickyShowTypes.INITIAL);
    }
  }, [props.resetStickyState]);

  return (
    <div ref={containerRef} style={{ height: getInitialHeight() }}>
      <div
        className={
          stickyState === StickyShowTypes.SHOW ? getClassName(props) : ""
        }
        style={
          stickyState === StickyShowTypes.SHOW
            ? {
                ...styles,
                width: getStickyWidthHeight.width,
                height: getStickyWidthHeight.height,
              }
            : {}
        }
        id={props.id}
      >
        <div className={s.stickerHeader}>
          {props.isShowExpandIcon && stickyState === StickyShowTypes.SHOW && (
            <div
              className={s.scaleIcon}
              onClick={() => {
                setIsExpandSticker(!isExpandSticker);
              }}
            >
              {props.expandIcon ? (
                props.expandIcon
              ) : (
                <ExpandIcon width="24px" />
              )}
            </div>
          )}
          {(props.isManualCloseSticky || props.isShowHideIcon) &&
            stickyState === StickyShowTypes.SHOW && (
              <div
                className={s.closeIcon}
                onClick={() => {
                  setStickyState(StickyShowTypes.NONEONCLOSE);

                  if (props.callbackOnCloseSticky) {
                    props.callbackOnCloseSticky(true);
                  }
                }}
              >
                {props.hideIcon ? props.hideIcon : <HideIcon width="24px" />}
              </div>
            )}
        </div>

        <div>{props.children && props.children}</div>
      </div>
    </div>
  );
};
