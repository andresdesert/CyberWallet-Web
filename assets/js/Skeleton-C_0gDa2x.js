import{g as t,d as e,r as a,f as n,j as i,s as r,c as o,a as s,m as l,U as h,V as d,E as p,W as m,X as u}from"./index-CAkMPucN.js";function c(e){return t("MuiSkeleton",e)}e("MuiSkeleton",["root","text","rectangular","rounded","circular","pulse","wave","withChildren","fitContent","heightAuto"]);const f=u`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
`,g=u`
  0% {
    transform: translateX(-100%);
  }

  50% {
    /* +0.5s of delay between each loop */
    transform: translateX(100%);
  }

  100% {
    transform: translateX(100%);
  }
`,v="string"!=typeof f?m`
        animation: ${f} 2s ease-in-out 0.5s infinite;
      `:null,w="string"!=typeof g?m`
        &::after {
          animation: ${g} 2s linear 0.5s infinite;
        }
      `:null,y=r("span",{name:"MuiSkeleton",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:a}=t;return[e.root,e[a.variant],!1!==a.animation&&e[a.animation],a.hasChildren&&e.withChildren,a.hasChildren&&!a.width&&e.fitContent,a.hasChildren&&!a.height&&e.heightAuto]}})(l(({theme:t})=>{const e=h(t.shape.borderRadius)||"px",a=d(t.shape.borderRadius);return{display:"block",backgroundColor:t.vars?t.vars.palette.Skeleton.bg:p(t.palette.text.primary,"light"===t.palette.mode?.11:.13),height:"1.2em",variants:[{props:{variant:"text"},style:{marginTop:0,marginBottom:0,height:"auto",transformOrigin:"0 55%",transform:"scale(1, 0.60)",borderRadius:`${a}${e}/${Math.round(a/.6*10)/10}${e}`,"&:empty:before":{content:'"\\00a0"'}}},{props:{variant:"circular"},style:{borderRadius:"50%"}},{props:{variant:"rounded"},style:{borderRadius:(t.vars||t).shape.borderRadius}},{props:({ownerState:t})=>t.hasChildren,style:{"& > *":{visibility:"hidden"}}},{props:({ownerState:t})=>t.hasChildren&&!t.width,style:{maxWidth:"fit-content"}},{props:({ownerState:t})=>t.hasChildren&&!t.height,style:{height:"auto"}},{props:{animation:"pulse"},style:v||{animation:`${f} 2s ease-in-out 0.5s infinite`}},{props:{animation:"wave"},style:{position:"relative",overflow:"hidden",WebkitMaskImage:"-webkit-radial-gradient(white, black)","&::after":{background:`linear-gradient(\n                90deg,\n                transparent,\n                ${(t.vars||t).palette.action.hover},\n                transparent\n              )`,content:'""',position:"absolute",transform:"translateX(-100%)",bottom:0,left:0,right:0,top:0}}},{props:{animation:"wave"},style:w||{"&::after":{animation:`${g} 2s linear 0.5s infinite`}}}]}})),b=a.forwardRef(function(t,e){const a=n({props:t,name:"MuiSkeleton"}),{animation:r="pulse",className:l,component:h="span",height:d,style:p,variant:m="text",width:u,...f}=a,g={...a,animation:r,component:h,variant:m,hasChildren:Boolean(f.children)},v=(t=>{const{classes:e,variant:a,animation:n,hasChildren:i,width:r,height:o}=t;return s({root:["root",a,n,i&&"withChildren",i&&!r&&"fitContent",i&&!o&&"heightAuto"]},c,e)})(g);return i.jsx(y,{as:h,ref:e,className:o(v.root,l),ownerState:g,...f,style:{width:u,height:d,...p}})});export{b as S};
