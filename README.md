## tien-react-sticky

The React component for transforming element to sticky when scroll, like picture-in-picture, using [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)

There is a beta package on npm. I suggest you to use it in non-critical project as there are still some issues that I am working on for the official release.
[https://www.npmjs.com/package/beta-tien-react-sticky](https://www.npmjs.com/package/beta-tien-react-sticky)

If you want to feedback, please create a new issue in the Github repo. Thanks for all the helpful suggestions.

## Quick Start

This is a default **TienStickyScroll** declaration, the sticky will show as sticky when we scroll under the children element of <TienStickyScroll. /> (or target element)

```jsx
<TienStickyScroll
  style={{
    backgroundColor: "#ffffff",

    padding: "12px",
  }}
>
  <div style={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}>
    <h3>MP4 Video</h3>

    <video
      src="https://samplelib.com/lib/preview/mp4/sample-5s.mp4"
      controls
      width="100%"
    ></video>
  </div>
</TienStickyScroll>
```

We have two components: **TienStickyScroll** which is a component that supports sticky rendering props on scroll, and **TienSticky** which is a controlled component that you can customize, with the React useState being a good usage suggestion.

## I) TienStickyScroll component

An ideal TienStickyScroll declaration is to have width and height, expandWidth and expandHeight, expand and hide icon, when in the sticky state.

```jsx
<TienStickyScroll
  stickyWidth="400px"
  stickyHeight="300px"
  expandStickyWidth="500px"
  expandStickyHeight="400px"
  isShowHideIcon
  isShowExpandIcon
  style={{
    backgroundColor: "#ffffff",

    padding: "12px",
  }}
>
  <div style={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}>
    <h3>MP4 Video</h3>

    <video
      src="https://samplelib.com/lib/preview/mp4/sample-5s.mp4"
      controls
      width="100%"
    ></video>
  </div>
</TienStickyScroll>
```

If you want to remain the sticky after scrolling under target element, you can use `isManualCloseSticky`. However, when you click closed icon, it will permanently disappear. So there is an option is to use `resetStickyState` prop and pass it an incremental value. It will reset the sticky to the initial state, like you reload the browser tab.

```jsx



<TienStickyScroll





stickyWidth="400px"





stickyHeight="300px"





expandStickyWidth="500px"





expandStickyHeight="400px"





isShowExpandIcon





isManualCloseSticky





resetStickyState={triggerReset}





style={{





backgroundColor:  "#ffffff",





padding:  "12px",





}}





>





<div  style={{ width:  "80%", marginLeft:  "auto", marginRight:  "auto"  }}>





<h3>MP4 Video</h3>





<video





src="https://samplelib.com/lib/preview/mp4/sample-5s.mp4"





controls





width="100%"





></video>





</div>





</TienStickyScroll>





<button





onClick={()  =>  {





setTriggerReset(triggerReset  +  1);





}}





>





Show sticky again





</button>



```

If you want to change expandIcon or hideIcon, you can pass HTML elements such as img, svg or even a React component into `expandIcon` and `hideIcon` props. You can define whether to show sticky when scroll at x% of the target element, with x ranges from 0-100. Furthermore, you can set `stickyPosition`: "top-left", "top-right", "bottom-left" or "bottom-right".

```jsx



<TienStickyScroll





stickyWidth="400px"





stickyHeight="300px"





expandStickyWidth="500px"





expandStickyHeight="400px"





isShowExpandIcon





isManualCloseSticky





resetStickyState={triggerReset}





style={{





backgroundColor:  "#ffffff",





padding:  "12px",





}}





expandIcon={





<div  style={{ display:  "flex"  }}>





<p  style={{ marginRight:  "12px"  }}>Expand</p>





<img





src="https://www.svgrepo.com/show/193951/expand.svg"





alt="expand-icon"





width="24px"





/>





</div>





}





hideIcon={





<div  style={{ display:  "flex"  }}>





<p  style={{ marginRight:  "12px"  }}>Close</p>





<img





src="https://www.svgrepo.com/show/273966/close.svg"





alt="close-icon"





width="24px"





/>





</div>





}





showStickyAt={80}





stickyPosition={"bottom-left"}





>





<div  style={{ width:  "80%", marginLeft:  "auto", marginRight:  "auto"  }}>





<h3>MP4 Video</h3>





<video





src="https://samplelib.com/lib/preview/mp4/sample-5s.mp4"





controls





width="100%"





></video>





</div>





</TienStickyScroll>







<button





onClick={()  =>  {





setTriggerReset(triggerReset  +  1);





}}





>





Show sticky again





</button>



```

### All TienStickyScroll Props

| Name | Description | Type |

| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |

| stickyPosition | Place sticky in top-left/top-right/bottom-left/bottom-right. Default is "bottom-right". | string |

| stickyWidth | Set width of the sticky using CSS width. Default width is 300px. | string or number |

| stickyHeight | Set height of the sticky using CSS height. Default height is 200px. | string or number |

| showStickyAt | Show sticky when scroll to X% of the original element's height. Default showStickyAt is 0.<br/> showStickyAt is an interger that ranges from 0 - 100. | number |

| isShowExpandIcon | Show the expand icon. | boolean |

| isShowHideIcon | Show the hide icon. | boolean |

| isManualCloseSticky | If true, the sticky will be constantly remained after scrolling below the origin element.<br/> If you click close icon, the sticky will be permanent disappeared. Use resetStickyState prop to reset sticky to its initial state. | boolean |

| resetStickyState | Use to reset the initial state of sticky. Use it as controlled mode, with default = 0. <br/> For example, you click close icon when set isManualCloseSticky={true}, use resetStickyState with incremental value is the same as reload page. | number |

| expandStickyWidth | Set width of the expanded sticky using CSS width. Default expanded width is 400px. | number or string |

| expandStickyHeight | Set height of the expanded sticky using CSS height. Default expanded height is 300px. | number or string |

| callbackOnCloseSticky | Callback when click close icon. For example, use for pause/stop video. | callbackOnCloseSticky?: (isCloseSticky: boolean) => void; |

| expandIcon | Replace default Font Awesome <ExpandIcon. />. You can use HTML elements such as img or svg. | React.ReactNode |

| hideIcon | Replace default Font Awesome <HideIcon. />. You can use HTML elements such as img or svg. | React.ReactNode |

| className | The HTML `className` attribute. This set the value of element's class content attribute. <br/> Do not recommend using `className` attribute. Should use only to change background, padding, color of sticky. | string |

| id | The HTML `id` attribute. This set the value of element's id content attribute. <br/> Do not recommend using `id` attribute. Should use only to change background, padding, color of sticky. | string |

| style | The ReactJS `style` attribute. This set the value of element's style content attribute.<br/> Do not recommend using `style` attribute. Should use only to change background, padding, color of sticky. | React.CSSProperties |

## II) TienSticky component

TienSticky is a controlled component that provides props can help you customize and manipulate the sticky state.

```jsx



//Declare useState hook

const  [showSticky,  setShowSticky]  =  useState<boolean>(true);

const  [expandSticky,  setExpandSticky]  =  useState<boolean>(false);



//.....



<button



onClick={()  =>  {



setShowSticky(true);



}}



>



Show sticky



</button>





<TienSticky



stickyPosition="top-left"



stickyWidth="400px"



stickyHeight="300px"



expandStickyWidth="500px"



expandStickyHeight="400px"



isShowSticky={showSticky}



isExpandSticky={expandSticky}



headerSticky={



<div  style={{ display:  "flex"  }}>



<img



src="https://www.svgrepo.com/show/273966/close.svg"



alt="close-icon"



width="24px"



onClick={()  =>  setShowSticky(false)}



/>



<img



src="https://www.svgrepo.com/show/193951/expand.svg"



alt="expand-icon"



width="24px"



style={{ marginLeft:  "auto"  }}



onClick={()  =>  setExpandSticky(!expandSticky)}



/>



</div>



}



style={{



backgroundColor:  "#ffffff",



padding:  "12px",



}}



>



<div  style={{ width:  "80%", marginLeft:  "auto", marginRight:  "auto"  }}>



<h3>MP4 Video</h3>





<video



src="https://samplelib.com/lib/preview/mp4/sample-5s.mp4"



controls



width="100%"



></video>



</div>



</TienSticky>



```

### All TienSticky Props

| Name | Description | Type |

| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------- |

| stickyPosition | Place sticky in "top-left", "top-right", "bottom-left" or "bottom-right". Default is "bottom-right". | string |

| stickyWidth | Set width of the sticky using CSS width. Default width is 300px. | string or number |

| stickyHeight | Set height of the sticky using CSS height. Default height is 200px. | string or number |

| isShowSticky | Visible value of sticky in controlled mode. | boolean |

| isExpandSticky | Decide if the sticky will expand or not in a controlled mode. | boolean |

| expandStickyWidth | Set width of the expanded sticky using CSS width. Default expanded width is 400px. | number or string |

| expandStickyHeight | Set height of the expanded sticky using CSS height. Default expanded height is 300px. | number or string |

| headerSticky | Set header of the sticky. You can use HTML elements to display some buttons that can close or expand the sticky. | React.ReactNode |

| className | The HTML `className` attribute. This set the value of element's class content attribute. <br/> Do not recommend using `className` attribute. Should use only to change background, padding, color of sticky. | string |

| id | The HTML `id` attribute. This set the value of element's id content attribute. <br/> Do not recommend using `id` attribute. Should use only to change background, padding, color of sticky. | string |

| style | The ReactJS `style` attribute. This set the value of element's style content attribute.<br/> Do not recommend using `style` attribute. Should use only to change background, padding, color of sticky. | React.CSSProperties |

| ref | The ReactJS `ref` attribute. This ref is an attribute of original div element which contains the children you passed. This ref can be used to observe by the Intersection Observer API | |
