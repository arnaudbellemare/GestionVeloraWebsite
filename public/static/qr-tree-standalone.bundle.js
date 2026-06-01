"use strict";var e=Object.create,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,o=(Y,$)=>()=>($||Y(($={exports:{}}).exports,$),$.exports),s=(Y,$,q,G)=>{if($&&typeof $=="object"||typeof $=="function")for(var X=r($),H=0,Z=X.length,Q;H<Z;H++)Q=X[H],!a.call(Y,Q)&&Q!==q&&t(Y,Q,{get:(pt=>$[pt]).bind(null,Q),enumerable:!(G=n($,Q))||G.enumerable});return Y},c=(Y,$,q)=>(q=Y==null?{}:e(i(Y)),s($||!Y||!Y.__esModule?t(q,"default",{value:Y,enumerable:!0}):q,Y));(function(){let Y=document.createElement("link").relList;if(Y&&Y.supports&&Y.supports("modulepreload"))return;for(let G of document.querySelectorAll('link[rel="modulepreload"]'))q(G);new MutationObserver(G=>{for(let X of G)if(X.type==="childList")for(let H of X.addedNodes)H.tagName==="LINK"&&H.rel==="modulepreload"&&q(H)}).observe(document,{childList:!0,subtree:!0});function $(G){let X={};return G.integrity&&(X.integrity=G.integrity),G.referrerPolicy&&(X.referrerPolicy=G.referrerPolicy),G.crossOrigin==="use-credentials"?X.credentials="include":G.crossOrigin==="anonymous"?X.credentials="omit":X.credentials="same-origin",X}function q(G){if(G.ep)return;G.ep=!0;let X=$(G);fetch(G.href,X)}})();var l=o(Y=>{var $=Symbol.for("react.transitional.element"),q=Symbol.for("react.portal"),G=Symbol.for("react.fragment"),X=Symbol.for("react.strict_mode"),H=Symbol.for("react.profiler"),Z=Symbol.for("react.consumer"),Q=Symbol.for("react.context"),pt=Symbol.for("react.forward_ref"),ft=Symbol.for("react.suspense"),ht=Symbol.for("react.memo"),kt=Symbol.for("react.lazy"),mt=Symbol.for("react.activity"),At=Symbol.iterator;function It(K){return typeof K!="object"||!K?null:(K=At&&K[At]||K["@@iterator"],typeof K=="function"?K:null)}var Xt={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},qt=Object.assign,Yt={};function xt(K,St,Mt){this.props=K,this.context=St,this.refs=Yt,this.updater=Mt||Xt}xt.prototype.isReactComponent={},xt.prototype.setState=function(K,St){if(typeof K!="object"&&typeof K!="function"&&K!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,K,St,"setState")},xt.prototype.forceUpdate=function(K){this.updater.enqueueForceUpdate(this,K,"forceUpdate")};function Rt(){}Rt.prototype=xt.prototype;function Nt(K,St,Mt){this.props=K,this.context=St,this.refs=Yt,this.updater=Mt||Xt}var Kt=Nt.prototype=new Rt;Kt.constructor=Nt,qt(Kt,xt.prototype),Kt.isPureReactComponent=!0;var $t=Array.isArray;function Bt(){}var _t={H:null,A:null,T:null,S:null},Gt=Object.prototype.hasOwnProperty;function Ft(K,St,Mt){var Ht=Mt.ref;return{$$typeof:$,type:K,key:St,ref:Ht===void 0?null:Ht,props:Mt}}function Ut(K,St){return Ft(K.type,St,K.props)}function Vt(K){return typeof K=="object"&&!!K&&K.$$typeof===$}function Ot(K){var St={"=":"=0",":":"=2"};return"$"+K.replace(/[=:]/g,function(Mt){return St[Mt]})}var Pt=/\/+/g;function Qt(K,St){return typeof K=="object"&&K&&K.key!=null?Ot(""+K.key):St.toString(36)}function Dt(K){switch(K.status){case"fulfilled":return K.value;case"rejected":throw K.reason;default:switch(typeof K.status=="string"?K.then(Bt,Bt):(K.status="pending",K.then(function(St){K.status==="pending"&&(K.status="fulfilled",K.value=St)},function(St){K.status==="pending"&&(K.status="rejected",K.reason=St)})),K.status){case"fulfilled":return K.value;case"rejected":throw K.reason}}throw K}function Tt(K,St,Mt,Ht,Jt){var Wt=typeof K;(Wt==="undefined"||Wt==="boolean")&&(K=null);var ln=!1;if(K===null)ln=!0;else switch(Wt){case"bigint":case"string":case"number":ln=!0;break;case"object":switch(K.$$typeof){case $:case q:ln=!0;break;case kt:return ln=K._init,Tt(ln(K._payload),St,Mt,Ht,Jt)}}if(ln)return Jt=Jt(K),ln=Ht===""?"."+Qt(K,0):Ht,$t(Jt)?(Mt="",ln!=null&&(Mt=ln.replace(Pt,"$&/")+"/"),Tt(Jt,St,Mt,"",function(Nr){return Nr})):Jt!=null&&(Vt(Jt)&&(Jt=Ut(Jt,Mt+(Jt.key==null||K&&K.key===Jt.key?"":(""+Jt.key).replace(Pt,"$&/")+"/")+ln)),St.push(Jt)),1;ln=0;var vn=Ht===""?".":Ht+":";if($t(K))for(var yn=0;yn<K.length;yn++)Ht=K[yn],Wt=vn+Qt(Ht,yn),ln+=Tt(Ht,St,Mt,Wt,Jt);else if(yn=It(K),typeof yn=="function")for(K=yn.call(K),yn=0;!(Ht=K.next()).done;)Ht=Ht.value,Wt=vn+Qt(Ht,yn++),ln+=Tt(Ht,St,Mt,Wt,Jt);else if(Wt==="object"){if(typeof K.then=="function")return Tt(Dt(K),St,Mt,Ht,Jt);throw St=String(K),Error("Objects are not valid as a React child (found: "+(St==="[object Object]"?"object with keys {"+Object.keys(K).join(", ")+"}":St)+"). If you meant to render a collection of children, use an array instead.")}return ln}function Lt(K,St,Mt){if(K==null)return K;var Ht=[],Jt=0;return Tt(K,Ht,"","",function(Wt){return St.call(Mt,Wt,Jt++)}),Ht}function nn(K){if(K._status===-1){var St=K._result;St=St(),St.then(function(Mt){(K._status===0||K._status===-1)&&(K._status=1,K._result=Mt)},function(Mt){(K._status===0||K._status===-1)&&(K._status=2,K._result=Mt)}),K._status===-1&&(K._status=0,K._result=St)}if(K._status===1)return K._result.default;throw K._result}var tn=typeof reportError=="function"?reportError:function(K){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var St=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof K=="object"&&K&&typeof K.message=="string"?String(K.message):String(K),error:K});if(!window.dispatchEvent(St))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",K);return}console.error(K)},sn={map:Lt,forEach:function(K,St,Mt){Lt(K,function(){St.apply(this,arguments)},Mt)},count:function(K){var St=0;return Lt(K,function(){St++}),St},toArray:function(K){return Lt(K,function(St){return St})||[]},only:function(K){if(!Vt(K))throw Error("React.Children.only expected to receive a single React element child.");return K}};Y.Activity=mt,Y.Children=sn,Y.Component=xt,Y.Fragment=G,Y.Profiler=H,Y.PureComponent=Nt,Y.StrictMode=X,Y.Suspense=ft,Y.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=_t,Y.__COMPILER_RUNTIME={__proto__:null,c:function(K){return _t.H.useMemoCache(K)}},Y.cache=function(K){return function(){return K.apply(null,arguments)}},Y.cacheSignal=function(){return null},Y.cloneElement=function(K,St,Mt){if(K==null)throw Error("The argument must be a React element, but you passed "+K+".");var Ht=qt({},K.props),Jt=K.key;if(St!=null)for(Wt in St.key!==void 0&&(Jt=""+St.key),St)!Gt.call(St,Wt)||Wt==="key"||Wt==="__self"||Wt==="__source"||Wt==="ref"&&St.ref===void 0||(Ht[Wt]=St[Wt]);var Wt=arguments.length-2;if(Wt===1)Ht.children=Mt;else if(1<Wt){for(var ln=Array(Wt),vn=0;vn<Wt;vn++)ln[vn]=arguments[vn+2];Ht.children=ln}return Ft(K.type,Jt,Ht)},Y.createContext=function(K){return K={$$typeof:Q,_currentValue:K,_currentValue2:K,_threadCount:0,Provider:null,Consumer:null},K.Provider=K,K.Consumer={$$typeof:Z,_context:K},K},Y.createElement=function(K,St,Mt){var Ht,Jt={},Wt=null;if(St!=null)for(Ht in St.key!==void 0&&(Wt=""+St.key),St)Gt.call(St,Ht)&&Ht!=="key"&&Ht!=="__self"&&Ht!=="__source"&&(Jt[Ht]=St[Ht]);var ln=arguments.length-2;if(ln===1)Jt.children=Mt;else if(1<ln){for(var vn=Array(ln),yn=0;yn<ln;yn++)vn[yn]=arguments[yn+2];Jt.children=vn}if(K&&K.defaultProps)for(Ht in ln=K.defaultProps,ln)Jt[Ht]===void 0&&(Jt[Ht]=ln[Ht]);return Ft(K,Wt,Jt)},Y.createRef=function(){return{current:null}},Y.forwardRef=function(K){return{$$typeof:pt,render:K}},Y.isValidElement=Vt,Y.lazy=function(K){return{$$typeof:kt,_payload:{_status:-1,_result:K},_init:nn}},Y.memo=function(K,St){return{$$typeof:ht,type:K,compare:St===void 0?null:St}},Y.startTransition=function(K){var St=_t.T,Mt={};_t.T=Mt;try{var Ht=K(),Jt=_t.S;Jt!==null&&Jt(Mt,Ht),typeof Ht=="object"&&Ht&&typeof Ht.then=="function"&&Ht.then(Bt,tn)}catch(Wt){tn(Wt)}finally{St!==null&&Mt.types!==null&&(St.types=Mt.types),_t.T=St}},Y.unstable_useCacheRefresh=function(){return _t.H.useCacheRefresh()},Y.use=function(K){return _t.H.use(K)},Y.useActionState=function(K,St,Mt){return _t.H.useActionState(K,St,Mt)},Y.useCallback=function(K,St){return _t.H.useCallback(K,St)},Y.useContext=function(K){return _t.H.useContext(K)},Y.useDebugValue=function(){},Y.useDeferredValue=function(K,St){return _t.H.useDeferredValue(K,St)},Y.useEffect=function(K,St){return _t.H.useEffect(K,St)},Y.useEffectEvent=function(K){return _t.H.useEffectEvent(K)},Y.useId=function(){return _t.H.useId()},Y.useImperativeHandle=function(K,St,Mt){return _t.H.useImperativeHandle(K,St,Mt)},Y.useInsertionEffect=function(K,St){return _t.H.useInsertionEffect(K,St)},Y.useLayoutEffect=function(K,St){return _t.H.useLayoutEffect(K,St)},Y.useMemo=function(K,St){return _t.H.useMemo(K,St)},Y.useOptimistic=function(K,St){return _t.H.useOptimistic(K,St)},Y.useReducer=function(K,St,Mt){return _t.H.useReducer(K,St,Mt)},Y.useRef=function(K){return _t.H.useRef(K)},Y.useState=function(K){return _t.H.useState(K)},Y.useSyncExternalStore=function(K,St,Mt){return _t.H.useSyncExternalStore(K,St,Mt)},Y.useTransition=function(){return _t.H.useTransition()},Y.version="19.2.4"}),u=o((Y,$)=>{$.exports=l()}),d=o(Y=>{function $(Dt,Tt){var Lt=Dt.length;Dt.push(Tt);e:for(;0<Lt;){var nn=Lt-1>>>1,tn=Dt[nn];if(0<X(tn,Tt))Dt[nn]=Tt,Dt[Lt]=tn,Lt=nn;else break e}}function q(Dt){return Dt.length===0?null:Dt[0]}function G(Dt){if(Dt.length===0)return null;var Tt=Dt[0],Lt=Dt.pop();if(Lt!==Tt){Dt[0]=Lt;e:for(var nn=0,tn=Dt.length,sn=tn>>>1;nn<sn;){var K=2*(nn+1)-1,St=Dt[K],Mt=K+1,Ht=Dt[Mt];if(0>X(St,Lt))Mt<tn&&0>X(Ht,St)?(Dt[nn]=Ht,Dt[Mt]=Lt,nn=Mt):(Dt[nn]=St,Dt[K]=Lt,nn=K);else if(Mt<tn&&0>X(Ht,Lt))Dt[nn]=Ht,Dt[Mt]=Lt,nn=Mt;else break e}}return Tt}function X(Dt,Tt){var Lt=Dt.sortIndex-Tt.sortIndex;return Lt===0?Dt.id-Tt.id:Lt}if(Y.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var H=performance;Y.unstable_now=function(){return H.now()}}else{var Z=Date,Q=Z.now();Y.unstable_now=function(){return Z.now()-Q}}var pt=[],ft=[],ht=1,kt=null,mt=3,At=!1,It=!1,Xt=!1,qt=!1,Yt=typeof setTimeout=="function"?setTimeout:null,xt=typeof clearTimeout=="function"?clearTimeout:null,Rt=typeof setImmediate<"u"?setImmediate:null;function Nt(Dt){for(var Tt=q(ft);Tt!==null;){if(Tt.callback===null)G(ft);else if(Tt.startTime<=Dt)G(ft),Tt.sortIndex=Tt.expirationTime,$(pt,Tt);else break;Tt=q(ft)}}function Kt(Dt){if(Xt=!1,Nt(Dt),!It)if(q(pt)!==null)It=!0,$t||($t=!0,Vt());else{var Tt=q(ft);Tt!==null&&Qt(Kt,Tt.startTime-Dt)}}var $t=!1,Bt=-1,_t=5,Gt=-1;function Ft(){return qt?!0:!(Y.unstable_now()-Gt<_t)}function Ut(){if(qt=!1,$t){var Dt=Y.unstable_now();Gt=Dt;var Tt=!0;try{e:{It=!1,Xt&&(Xt=!1,xt(Bt),Bt=-1),At=!0;var Lt=mt;try{t:{for(Nt(Dt),kt=q(pt);kt!==null&&!(kt.expirationTime>Dt&&Ft());){var nn=kt.callback;if(typeof nn=="function"){kt.callback=null,mt=kt.priorityLevel;var tn=nn(kt.expirationTime<=Dt);if(Dt=Y.unstable_now(),typeof tn=="function"){kt.callback=tn,Nt(Dt),Tt=!0;break t}kt===q(pt)&&G(pt),Nt(Dt)}else G(pt);kt=q(pt)}if(kt!==null)Tt=!0;else{var sn=q(ft);sn!==null&&Qt(Kt,sn.startTime-Dt),Tt=!1}}break e}finally{kt=null,mt=Lt,At=!1}Tt=void 0}}finally{Tt?Vt():$t=!1}}}var Vt;if(typeof Rt=="function")Vt=function(){Rt(Ut)};else if(typeof MessageChannel<"u"){var Ot=new MessageChannel,Pt=Ot.port2;Ot.port1.onmessage=Ut,Vt=function(){Pt.postMessage(null)}}else Vt=function(){Yt(Ut,0)};function Qt(Dt,Tt){Bt=Yt(function(){Dt(Y.unstable_now())},Tt)}Y.unstable_IdlePriority=5,Y.unstable_ImmediatePriority=1,Y.unstable_LowPriority=4,Y.unstable_NormalPriority=3,Y.unstable_Profiling=null,Y.unstable_UserBlockingPriority=2,Y.unstable_cancelCallback=function(Dt){Dt.callback=null},Y.unstable_forceFrameRate=function(Dt){0>Dt||125<Dt?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):_t=0<Dt?Math.floor(1e3/Dt):5},Y.unstable_getCurrentPriorityLevel=function(){return mt},Y.unstable_next=function(Dt){switch(mt){case 1:case 2:case 3:var Tt=3;break;default:Tt=mt}var Lt=mt;mt=Tt;try{return Dt()}finally{mt=Lt}},Y.unstable_requestPaint=function(){qt=!0},Y.unstable_runWithPriority=function(Dt,Tt){switch(Dt){case 1:case 2:case 3:case 4:case 5:break;default:Dt=3}var Lt=mt;mt=Dt;try{return Tt()}finally{mt=Lt}},Y.unstable_scheduleCallback=function(Dt,Tt,Lt){var nn=Y.unstable_now();switch(typeof Lt=="object"&&Lt?(Lt=Lt.delay,Lt=typeof Lt=="number"&&0<Lt?nn+Lt:nn):Lt=nn,Dt){case 1:var tn=-1;break;case 2:tn=250;break;case 5:tn=1073741823;break;case 4:tn=1e4;break;default:tn=5e3}return tn=Lt+tn,Dt={id:ht++,callback:Tt,priorityLevel:Dt,startTime:Lt,expirationTime:tn,sortIndex:-1},Lt>nn?(Dt.sortIndex=Lt,$(ft,Dt),q(pt)===null&&Dt===q(ft)&&(Xt?(xt(Bt),Bt=-1):Xt=!0,Qt(Kt,Lt-nn))):(Dt.sortIndex=tn,$(pt,Dt),It||At||(It=!0,$t||($t=!0,Vt()))),Dt},Y.unstable_shouldYield=Ft,Y.unstable_wrapCallback=function(Dt){var Tt=mt;return function(){var Lt=mt;mt=Tt;try{return Dt.apply(this,arguments)}finally{mt=Lt}}}}),f=o((Y,$)=>{$.exports=d()}),p=o(Y=>{var $=u();function q(ft){var ht="https://react.dev/errors/"+ft;if(1<arguments.length){ht+="?args[]="+encodeURIComponent(arguments[1]);for(var kt=2;kt<arguments.length;kt++)ht+="&args[]="+encodeURIComponent(arguments[kt])}return"Minified React error #"+ft+"; visit "+ht+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function G(){}var X={d:{f:G,r:function(){throw Error(q(522))},D:G,C:G,L:G,m:G,X:G,S:G,M:G},p:0,findDOMNode:null},H=Symbol.for("react.portal");function Z(ft,ht,kt){var mt=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:H,key:mt==null?null:""+mt,children:ft,containerInfo:ht,implementation:kt}}var Q=$.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function pt(ft,ht){if(ft==="font")return"";if(typeof ht=="string")return ht==="use-credentials"?ht:""}Y.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=X,Y.createPortal=function(ft,ht){var kt=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!ht||ht.nodeType!==1&&ht.nodeType!==9&&ht.nodeType!==11)throw Error(q(299));return Z(ft,ht,null,kt)},Y.flushSync=function(ft){var ht=Q.T,kt=X.p;try{if(Q.T=null,X.p=2,ft)return ft()}finally{Q.T=ht,X.p=kt,X.d.f()}},Y.preconnect=function(ft,ht){typeof ft=="string"&&(ht?(ht=ht.crossOrigin,ht=typeof ht=="string"?ht==="use-credentials"?ht:"":void 0):ht=null,X.d.C(ft,ht))},Y.prefetchDNS=function(ft){typeof ft=="string"&&X.d.D(ft)},Y.preinit=function(ft,ht){if(typeof ft=="string"&&ht&&typeof ht.as=="string"){var kt=ht.as,mt=pt(kt,ht.crossOrigin),At=typeof ht.integrity=="string"?ht.integrity:void 0,It=typeof ht.fetchPriority=="string"?ht.fetchPriority:void 0;kt==="style"?X.d.S(ft,typeof ht.precedence=="string"?ht.precedence:void 0,{crossOrigin:mt,integrity:At,fetchPriority:It}):kt==="script"&&X.d.X(ft,{crossOrigin:mt,integrity:At,fetchPriority:It,nonce:typeof ht.nonce=="string"?ht.nonce:void 0})}},Y.preinitModule=function(ft,ht){if(typeof ft=="string")if(typeof ht=="object"&&ht){if(ht.as==null||ht.as==="script"){var kt=pt(ht.as,ht.crossOrigin);X.d.M(ft,{crossOrigin:kt,integrity:typeof ht.integrity=="string"?ht.integrity:void 0,nonce:typeof ht.nonce=="string"?ht.nonce:void 0})}}else ht??X.d.M(ft)},Y.preload=function(ft,ht){if(typeof ft=="string"&&typeof ht=="object"&&ht&&typeof ht.as=="string"){var kt=ht.as,mt=pt(kt,ht.crossOrigin);X.d.L(ft,kt,{crossOrigin:mt,integrity:typeof ht.integrity=="string"?ht.integrity:void 0,nonce:typeof ht.nonce=="string"?ht.nonce:void 0,type:typeof ht.type=="string"?ht.type:void 0,fetchPriority:typeof ht.fetchPriority=="string"?ht.fetchPriority:void 0,referrerPolicy:typeof ht.referrerPolicy=="string"?ht.referrerPolicy:void 0,imageSrcSet:typeof ht.imageSrcSet=="string"?ht.imageSrcSet:void 0,imageSizes:typeof ht.imageSizes=="string"?ht.imageSizes:void 0,media:typeof ht.media=="string"?ht.media:void 0})}},Y.preloadModule=function(ft,ht){if(typeof ft=="string")if(ht){var kt=pt(ht.as,ht.crossOrigin);X.d.m(ft,{as:typeof ht.as=="string"&&ht.as!=="script"?ht.as:void 0,crossOrigin:kt,integrity:typeof ht.integrity=="string"?ht.integrity:void 0})}else X.d.m(ft)},Y.requestFormReset=function(ft){X.d.r(ft)},Y.unstable_batchedUpdates=function(ft,ht){return ft(ht)},Y.useFormState=function(ft,ht,kt){return Q.H.useFormState(ft,ht,kt)},Y.useFormStatus=function(){return Q.H.useHostTransitionStatus()},Y.version="19.2.4"}),m=o((Y,$)=>{function q(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(q)}catch(G){console.error(G)}}q(),$.exports=p()}),h=o(Y=>{var $=f(),q=u(),G=m();function X(z){var L="https://react.dev/errors/"+z;if(1<arguments.length){L+="?args[]="+encodeURIComponent(arguments[1]);for(var R=2;R<arguments.length;R++)L+="&args[]="+encodeURIComponent(arguments[R])}return"Minified React error #"+z+"; visit "+L+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function H(z){return!(!z||z.nodeType!==1&&z.nodeType!==9&&z.nodeType!==11)}function Z(z){var L=z,R=z;if(z.alternate)for(;L.return;)L=L.return;else{z=L;do L=z,L.flags&4098&&(R=L.return),z=L.return;while(z)}return L.tag===3?R:null}function Q(z){if(z.tag===13){var L=z.memoizedState;if(L===null&&(z=z.alternate,z!==null&&(L=z.memoizedState)),L!==null)return L.dehydrated}return null}function pt(z){if(z.tag===31){var L=z.memoizedState;if(L===null&&(z=z.alternate,z!==null&&(L=z.memoizedState)),L!==null)return L.dehydrated}return null}function ft(z){if(Z(z)!==z)throw Error(X(188))}function ht(z){var L=z.alternate;if(!L){if(L=Z(z),L===null)throw Error(X(188));return L===z?z:null}for(var R=z,I=L;;){var B=R.return;if(B===null)break;var F=B.alternate;if(F===null){if(I=B.return,I!==null){R=I;continue}break}if(B.child===F.child){for(F=B.child;F;){if(F===R)return ft(B),z;if(F===I)return ft(B),L;F=F.sibling}throw Error(X(188))}if(R.return!==I.return)R=B,I=F;else{for(var U=!1,V=B.child;V;){if(V===R){U=!0,R=B,I=F;break}if(V===I){U=!0,I=B,R=F;break}V=V.sibling}if(!U){for(V=F.child;V;){if(V===R){U=!0,R=F,I=B;break}if(V===I){U=!0,I=F,R=B;break}V=V.sibling}if(!U)throw Error(X(189))}}if(R.alternate!==I)throw Error(X(190))}if(R.tag!==3)throw Error(X(188));return R.stateNode.current===R?z:L}function kt(z){var L=z.tag;if(L===5||L===26||L===27||L===6)return z;for(z=z.child;z!==null;){if(L=kt(z),L!==null)return L;z=z.sibling}return null}var mt=Object.assign,At=Symbol.for("react.element"),It=Symbol.for("react.transitional.element"),Xt=Symbol.for("react.portal"),qt=Symbol.for("react.fragment"),Yt=Symbol.for("react.strict_mode"),xt=Symbol.for("react.profiler"),Rt=Symbol.for("react.consumer"),Nt=Symbol.for("react.context"),Kt=Symbol.for("react.forward_ref"),$t=Symbol.for("react.suspense"),Bt=Symbol.for("react.suspense_list"),_t=Symbol.for("react.memo"),Gt=Symbol.for("react.lazy"),Ft=Symbol.for("react.activity"),Ut=Symbol.for("react.memo_cache_sentinel"),Vt=Symbol.iterator;function Ot(z){return typeof z!="object"||!z?null:(z=Vt&&z[Vt]||z["@@iterator"],typeof z=="function"?z:null)}var Pt=Symbol.for("react.client.reference");function Qt(z){if(z==null)return null;if(typeof z=="function")return z.$$typeof===Pt?null:z.displayName||z.name||null;if(typeof z=="string")return z;switch(z){case qt:return"Fragment";case xt:return"Profiler";case Yt:return"StrictMode";case $t:return"Suspense";case Bt:return"SuspenseList";case Ft:return"Activity"}if(typeof z=="object")switch(z.$$typeof){case Xt:return"Portal";case Nt:return z.displayName||"Context";case Rt:return(z._context.displayName||"Context")+".Consumer";case Kt:var L=z.render;return z=z.displayName,z||(z=(z=L.displayName||L.name||"",z===""?"ForwardRef":"ForwardRef("+z+")")),z;case _t:return L=z.displayName||null,L===null?Qt(z.type)||"Memo":L;case Gt:L=z._payload,z=z._init;try{return Qt(z(L))}catch{}}return null}var Dt=Array.isArray,Tt=q.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,Lt=G.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,nn={pending:!1,data:null,method:null,action:null},tn=[],sn=-1;function K(z){return{current:z}}function St(z){0>sn||(z.current=tn[sn],tn[sn]=null,sn--)}function Mt(z,L){sn++,tn[sn]=z.current,z.current=L}var Ht=K(null),Jt=K(null),Wt=K(null),ln=K(null);function vn(z,L){switch(Mt(Wt,L),Mt(Jt,z),Mt(Ht,null),L.nodeType){case 9:case 11:z=(z=L.documentElement)&&(z=z.namespaceURI)?T0(z):0;break;default:if(z=L.tagName,L=L.namespaceURI)L=T0(L),z=z0(L,z);else switch(z){case"svg":z=1;break;case"math":z=2;break;default:z=0}}St(Ht),Mt(Ht,z)}function yn(){St(Ht),St(Jt),St(Wt)}function Nr(z){z.memoizedState!==null&&Mt(ln,z);var L=Ht.current,R=z0(L,z.type);L!==R&&(Mt(Jt,z),Mt(Ht,R))}function wl(z){Jt.current===z&&(St(Ht),St(Jt)),ln.current===z&&(St(ln),_o._currentValue=nn)}var kl,Ua;function wr(z){if(kl===void 0)try{throw Error()}catch(R){var L=R.stack.trim().match(/\n( *(at )?)/);kl=L&&L[1]||"",Ua=-1<R.stack.indexOf(`
    at`)?" (<anonymous>)":-1<R.stack.indexOf("@")?"@unknown:0:0":""}return`
`+kl+z+Ua}var Zl=!1;function Ql(z,L){if(!z||Zl)return"";Zl=!0;var R=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var I={DetermineComponentFrameRoot:function(){try{if(L){var zt=function(){throw Error()};if(Object.defineProperty(zt.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(zt,[])}catch(wt){var bt=wt}Reflect.construct(z,[],zt)}else{try{zt.call()}catch(wt){bt=wt}z.call(zt.prototype)}}else{try{throw Error()}catch(wt){bt=wt}(zt=z())&&typeof zt.catch=="function"&&zt.catch(function(){})}}catch(wt){if(wt&&bt&&typeof wt.stack=="string")return[wt.stack,bt.stack]}return[null,null]}};I.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var B=Object.getOwnPropertyDescriptor(I.DetermineComponentFrameRoot,"name");B&&B.configurable&&Object.defineProperty(I.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var F=I.DetermineComponentFrameRoot(),U=F[0],V=F[1];if(U&&V){var W=U.split(`
`),yt=V.split(`
`);for(B=I=0;I<W.length&&!W[I].includes("DetermineComponentFrameRoot");)I++;for(;B<yt.length&&!yt[B].includes("DetermineComponentFrameRoot");)B++;if(I===W.length||B===yt.length)for(I=W.length-1,B=yt.length-1;1<=I&&0<=B&&W[I]!==yt[B];)B--;for(;1<=I&&0<=B;I--,B--)if(W[I]!==yt[B]){if(I!==1||B!==1)do if(I--,B--,0>B||W[I]!==yt[B]){var Ct=`
`+W[I].replace(" at new "," at ");return z.displayName&&Ct.includes("<anonymous>")&&(Ct=Ct.replace("<anonymous>",z.displayName)),Ct}while(1<=I&&0<=B);break}}}finally{Zl=!1,Error.prepareStackTrace=R}return(R=z?z.displayName||z.name:"")?wr(R):""}function Io(z,L){switch(z.tag){case 26:case 27:case 5:return wr(z.type);case 16:return wr("Lazy");case 13:return z.child!==L&&L!==null?wr("Suspense Fallback"):wr("Suspense");case 19:return wr("SuspenseList");case 0:case 15:return Ql(z.type,!1);case 11:return Ql(z.type.render,!1);case 1:return Ql(z.type,!0);case 31:return wr("Activity");default:return""}}function Xa(z){try{var L="",R=null;do L+=Io(z,R),R=z,z=z.return;while(z);return L}catch(I){return`
Error generating stack: `+I.message+`
`+I.stack}}var Kl=Object.prototype.hasOwnProperty,Jl=$.unstable_scheduleCallback,Va=$.unstable_cancelCallback,Ya=$.unstable_shouldYield,Bo=$.unstable_requestPaint,$n=$.unstable_now,ts=$.unstable_getCurrentPriorityLevel,Ga=$.unstable_ImmediatePriority,Fo=$.unstable_UserBlockingPriority,Sl=$.unstable_NormalPriority,ns=$.unstable_LowPriority,Ha=$.unstable_IdlePriority,rs=$.log,ls=$.unstable_setDisableYieldValue,xl=null,jn=null;function ur(z){if(typeof rs=="function"&&ls(z),jn&&typeof jn.setStrictMode=="function")try{jn.setStrictMode(xl,z)}catch{}}var Xn=Math.clz32?Math.clz32:os,as=Math.log,$a=Math.LN2;function os(z){return z>>>=0,z===0?32:31-(as(z)/$a|0)|0}var Lr=256,Cl=262144,Zn=4194304;function Mr(z){var L=z&42;if(L!==0)return L;switch(z&-z){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return z&261888;case 262144:case 524288:case 1048576:case 2097152:return z&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return z&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return z}}function Kr(z,L,R){var I=z.pendingLanes;if(I===0)return 0;var B=0,F=z.suspendedLanes,U=z.pingedLanes;z=z.warmLanes;var V=I&134217727;return V===0?(V=I&~F,V===0?U===0?R||(R=I&~z,R!==0&&(B=Mr(R))):B=Mr(U):B=Mr(V)):(I=V&~F,I===0?(U&=V,U===0?R||(R=V&~z,R!==0&&(B=Mr(R))):B=Mr(U)):B=Mr(I)),B===0?0:L!==0&&L!==B&&!(L&F)&&(F=B&-B,R=L&-L,F>=R||F===32&&R&4194048)?L:B}function cr(z,L){return(z.pendingLanes&~(z.suspendedLanes&~z.pingedLanes)&L)===0}function Uo(z,L){switch(z){case 1:case 2:case 4:case 8:case 64:return L+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return L+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function El(){var z=Zn;return Zn<<=1,!(Zn&62914560)&&(Zn=4194304),z}function Pl(z){for(var L=[],R=0;31>R;R++)L.push(z);return L}function Tl(z,L){z.pendingLanes|=L,L!==268435456&&(z.suspendedLanes=0,z.pingedLanes=0,z.warmLanes=0)}function ea(z,L,R,I,B,F){var U=z.pendingLanes;z.pendingLanes=R,z.suspendedLanes=0,z.pingedLanes=0,z.warmLanes=0,z.expiredLanes&=R,z.entangledLanes&=R,z.errorRecoveryDisabledLanes&=R,z.shellSuspendCounter=0;var V=z.entanglements,W=z.expirationTimes,yt=z.hiddenUpdates;for(R=U&~R;0<R;){var Ct=31-Xn(R),zt=1<<Ct;V[Ct]=0,W[Ct]=-1;var bt=yt[Ct];if(bt!==null)for(yt[Ct]=null,Ct=0;Ct<bt.length;Ct++){var wt=bt[Ct];wt!==null&&(wt.lane&=-536870913)}R&=~zt}I!==0&&zl(z,I,0),F!==0&&B===0&&z.tag!==0&&(z.suspendedLanes|=F&~(U&~L))}function zl(z,L,R){z.pendingLanes|=L,z.suspendedLanes&=~L;var I=31-Xn(L);z.entangledLanes|=L,z.entanglements[I]=z.entanglements[I]|1073741824|R&261930}function Al(z,L){var R=z.entangledLanes|=L;for(z=z.entanglements;R;){var I=31-Xn(R),B=1<<I;B&L|z[I]&L&&(z[I]|=L),R&=~B}}function Xo(z,L){var R=L&-L;return R=R&42?1:Vo(R),R&(z.suspendedLanes|L)?0:R}function Vo(z){switch(z){case 2:z=1;break;case 8:z=4;break;case 32:z=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:z=128;break;case 268435456:z=134217728;break;default:z=0}return z}function Nl(z){return z&=-z,2<z?8<z?z&134217727?32:268435456:8:2}function Yo(){var z=Lt.p;return z===0?(z=window.event,z===void 0?32:W0(z.type)):z}function ta(z,L){var R=Lt.p;try{return Lt.p=z,L()}finally{Lt.p=R}}var Pr=Math.random().toString(36).slice(2),_n="__reactFiber$"+Pr,qn="__reactProps$"+Pr,kn="__reactContainer$"+Pr,na="__reactEvents$"+Pr,tp="__reactListeners$"+Pr,np="__reactHandles$"+Pr,gc="__reactResources$"+Pr,qa="__reactMarker$"+Pr;function is(z){delete z[_n],delete z[qn],delete z[na],delete z[tp],delete z[np]}function ra(z){var L=z[_n];if(L)return L;for(var R=z.parentNode;R;){if(L=R[kn]||R[_n]){if(R=L.alternate,L.child!==null||R!==null&&R.child!==null)for(z=R0(z);z!==null;){if(R=z[_n])return R;z=R0(z)}return L}z=R,R=z.parentNode}return null}function la(z){if(z=z[_n]||z[kn]){var L=z.tag;if(L===5||L===6||L===13||L===31||L===26||L===27||L===3)return z}return null}function ja(z){var L=z.tag;if(L===5||L===26||L===27||L===6)return z.stateNode;throw Error(X(33))}function aa(z){var L=z[gc];return L||(L=z[gc]={hoistableStyles:new Map,hoistableScripts:new Map}),L}function Fn(z){z[qa]=!0}var mc=new Set,vc={};function Ll(z,L){oa(z,L),oa(z+"Capture",L)}function oa(z,L){for(vc[z]=L,z=0;z<L.length;z++)mc.add(L[z])}var rp=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),yc={},bc={};function lp(z){return Kl.call(bc,z)?!0:Kl.call(yc,z)?!1:rp.test(z)?bc[z]=!0:(yc[z]=!0,!1)}function Go(z,L,R){if(lp(L))if(R===null)z.removeAttribute(L);else{switch(typeof R){case"undefined":case"function":case"symbol":z.removeAttribute(L);return;case"boolean":var I=L.toLowerCase().slice(0,5);if(I!=="data-"&&I!=="aria-"){z.removeAttribute(L);return}}z.setAttribute(L,""+R)}}function Ho(z,L,R){if(R===null)z.removeAttribute(L);else{switch(typeof R){case"undefined":case"function":case"symbol":case"boolean":z.removeAttribute(L);return}z.setAttribute(L,""+R)}}function _r(z,L,R,I){if(I===null)z.removeAttribute(R);else{switch(typeof I){case"undefined":case"function":case"symbol":case"boolean":z.removeAttribute(R);return}z.setAttributeNS(L,R,""+I)}}function fr(z){switch(typeof z){case"bigint":case"boolean":case"number":case"string":case"undefined":return z;case"object":return z;default:return""}}function wc(z){var L=z.type;return(z=z.nodeName)&&z.toLowerCase()==="input"&&(L==="checkbox"||L==="radio")}function ap(z,L,R){var I=Object.getOwnPropertyDescriptor(z.constructor.prototype,L);if(!z.hasOwnProperty(L)&&I!==void 0&&typeof I.get=="function"&&typeof I.set=="function"){var B=I.get,F=I.set;return Object.defineProperty(z,L,{configurable:!0,get:function(){return B.call(this)},set:function(U){R=""+U,F.call(this,U)}}),Object.defineProperty(z,L,{enumerable:I.enumerable}),{getValue:function(){return R},setValue:function(U){R=""+U},stopTracking:function(){z._valueTracker=null,delete z[L]}}}}function ss(z){if(!z._valueTracker){var L=wc(z)?"checked":"value";z._valueTracker=ap(z,L,""+z[L])}}function kc(z){if(!z)return!1;var L=z._valueTracker;if(!L)return!0;var R=L.getValue(),I="";return z&&(I=wc(z)?z.checked?"true":"false":z.value),z=I,z===R?!1:(L.setValue(z),!0)}function $o(z){if(z||(z=typeof document<"u"?document:void 0),z===void 0)return null;try{return z.activeElement||z.body}catch{return z.body}}var op=/[\n"\\]/g;function kr(z){return z.replace(op,function(L){return"\\"+L.charCodeAt(0).toString(16)+" "})}function us(z,L,R,I,B,F,U,V){z.name="",U!=null&&typeof U!="function"&&typeof U!="symbol"&&typeof U!="boolean"?z.type=U:z.removeAttribute("type"),L==null?U!=="submit"&&U!=="reset"||z.removeAttribute("value"):U==="number"?(L===0&&z.value===""||z.value!=L)&&(z.value=""+fr(L)):z.value!==""+fr(L)&&(z.value=""+fr(L)),L==null?R==null?I!=null&&z.removeAttribute("value"):cs(z,U,fr(R)):cs(z,U,fr(L)),B==null&&F!=null&&(z.defaultChecked=!!F),B!=null&&(z.checked=B&&typeof B!="function"&&typeof B!="symbol"),V!=null&&typeof V!="function"&&typeof V!="symbol"&&typeof V!="boolean"?z.name=""+fr(V):z.removeAttribute("name")}function Sc(z,L,R,I,B,F,U,V){if(F!=null&&typeof F!="function"&&typeof F!="symbol"&&typeof F!="boolean"&&(z.type=F),L!=null||R!=null){if(!(F!=="submit"&&F!=="reset"||L!=null)){ss(z);return}R=R==null?"":""+fr(R),L=L==null?R:""+fr(L),V||L===z.value||(z.value=L),z.defaultValue=L}I??(I=B),I=typeof I!="function"&&typeof I!="symbol"&&!!I,z.checked=V?z.checked:!!I,z.defaultChecked=!!I,U!=null&&typeof U!="function"&&typeof U!="symbol"&&typeof U!="boolean"&&(z.name=U),ss(z)}function cs(z,L,R){L==="number"&&$o(z.ownerDocument)===z||z.defaultValue===""+R||(z.defaultValue=""+R)}function ia(z,L,R,I){if(z=z.options,L){L={};for(var B=0;B<R.length;B++)L["$"+R[B]]=!0;for(R=0;R<z.length;R++)B=L.hasOwnProperty("$"+z[R].value),z[R].selected!==B&&(z[R].selected=B),B&&I&&(z[R].defaultSelected=!0)}else{for(R=""+fr(R),L=null,B=0;B<z.length;B++){if(z[B].value===R){z[B].selected=!0,I&&(z[B].defaultSelected=!0);return}L!==null||z[B].disabled||(L=z[B])}L!==null&&(L.selected=!0)}}function xc(z,L,R){if(L!=null&&(L=""+fr(L),L!==z.value&&(z.value=L),R==null)){z.defaultValue!==L&&(z.defaultValue=L);return}z.defaultValue=R==null?"":""+fr(R)}function Cc(z,L,R,I){if(L==null){if(I!=null){if(R!=null)throw Error(X(92));if(Dt(I)){if(1<I.length)throw Error(X(93));I=I[0]}R=I}R??(R=""),L=R}R=fr(L),z.defaultValue=R,I=z.textContent,I===R&&I!==""&&I!==null&&(z.value=I),ss(z)}function sa(z,L){if(L){var R=z.firstChild;if(R&&R===z.lastChild&&R.nodeType===3){R.nodeValue=L;return}}z.textContent=L}var ip=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Ec(z,L,R){var I=L.indexOf("--")===0;R==null||typeof R=="boolean"||R===""?I?z.setProperty(L,""):L==="float"?z.cssFloat="":z[L]="":I?z.setProperty(L,R):typeof R!="number"||R===0||ip.has(L)?L==="float"?z.cssFloat=R:z[L]=(""+R).trim():z[L]=R+"px"}function Pc(z,L,R){if(L!=null&&typeof L!="object")throw Error(X(62));if(z=z.style,R!=null){for(var I in R)!R.hasOwnProperty(I)||L!=null&&L.hasOwnProperty(I)||(I.indexOf("--")===0?z.setProperty(I,""):I==="float"?z.cssFloat="":z[I]="");for(var B in L)I=L[B],L.hasOwnProperty(B)&&R[B]!==I&&Ec(z,B,I)}else for(var F in L)L.hasOwnProperty(F)&&Ec(z,F,L[F])}function fs(z){if(z.indexOf("-")===-1)return!1;switch(z){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var sp=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),up=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function qo(z){return up.test(""+z)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":z}function Dr(){}var ds=null;function ps(z){return z=z.target||z.srcElement||window,z.correspondingUseElement&&(z=z.correspondingUseElement),z.nodeType===3?z.parentNode:z}var ua=null,ca=null;function Tc(z){var L=la(z);if(L&&(z=L.stateNode)){var R=z[qn]||null;e:switch(z=L.stateNode,L.type){case"input":if(us(z,R.value,R.defaultValue,R.defaultValue,R.checked,R.defaultChecked,R.type,R.name),L=R.name,R.type==="radio"&&L!=null){for(R=z;R.parentNode;)R=R.parentNode;for(R=R.querySelectorAll('input[name="'+kr(""+L)+'"][type="radio"]'),L=0;L<R.length;L++){var I=R[L];if(I!==z&&I.form===z.form){var B=I[qn]||null;if(!B)throw Error(X(90));us(I,B.value,B.defaultValue,B.defaultValue,B.checked,B.defaultChecked,B.type,B.name)}}for(L=0;L<R.length;L++)I=R[L],I.form===z.form&&kc(I)}break e;case"textarea":xc(z,R.value,R.defaultValue);break e;case"select":L=R.value,L!=null&&ia(z,!!R.multiple,L,!1)}}}var hs=!1;function zc(z,L,R){if(hs)return z(L,R);hs=!0;try{return z(L)}finally{if(hs=!1,(ua!==null||ca!==null)&&(Di(),ua&&(L=ua,z=ca,ca=ua=null,Tc(L),z)))for(L=0;L<z.length;L++)Tc(z[L])}}function Wa(z,L){var R=z.stateNode;if(R===null)return null;var I=R[qn]||null;if(I===null)return null;R=I[L];e:switch(L){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(I=!I.disabled)||(z=z.type,I=!(z==="button"||z==="input"||z==="select"||z==="textarea")),z=!I;break e;default:z=!1}if(z)return null;if(R&&typeof R!="function")throw Error(X(231,L,typeof R));return R}var Rr=!(typeof window>"u"||window.document===void 0||window.document.createElement===void 0),gs=!1;if(Rr)try{var Za={};Object.defineProperty(Za,"passive",{get:function(){gs=!0}}),window.addEventListener("test",Za,Za),window.removeEventListener("test",Za,Za)}catch{gs=!1}var Jr=null,ms=null,jo=null;function Ac(){if(jo)return jo;var z,L=ms,R=L.length,I,B="value"in Jr?Jr.value:Jr.textContent,F=B.length;for(z=0;z<R&&L[z]===B[z];z++);var U=R-z;for(I=1;I<=U&&L[R-I]===B[F-I];I++);return jo=B.slice(z,1<I?1-I:void 0)}function Wo(z){var L=z.keyCode;return"charCode"in z?(z=z.charCode,z===0&&L===13&&(z=13)):z=L,z===10&&(z=13),32<=z||z===13?z:0}function Zo(){return!0}function Nc(){return!1}function Qn(z){function L(R,I,B,F,U){for(var V in this._reactName=R,this._targetInst=B,this.type=I,this.nativeEvent=F,this.target=U,this.currentTarget=null,z)z.hasOwnProperty(V)&&(R=z[V],this[V]=R?R(F):F[V]);return this.isDefaultPrevented=(F.defaultPrevented==null?F.returnValue===!1:F.defaultPrevented)?Zo:Nc,this.isPropagationStopped=Nc,this}return mt(L.prototype,{preventDefault:function(){this.defaultPrevented=!0;var R=this.nativeEvent;R&&(R.preventDefault?R.preventDefault():typeof R.returnValue!="unknown"&&(R.returnValue=!1),this.isDefaultPrevented=Zo)},stopPropagation:function(){var R=this.nativeEvent;R&&(R.stopPropagation?R.stopPropagation():typeof R.cancelBubble!="unknown"&&(R.cancelBubble=!0),this.isPropagationStopped=Zo)},persist:function(){},isPersistent:Zo}),L}var Ml={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(z){return z.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Qo=Qn(Ml),Qa=mt({},Ml,{view:0,detail:0}),cp=Qn(Qa),vs,ys,Ka,Ko=mt({},Qa,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:ws,button:0,buttons:0,relatedTarget:function(z){return z.relatedTarget===void 0?z.fromElement===z.srcElement?z.toElement:z.fromElement:z.relatedTarget},movementX:function(z){return"movementX"in z?z.movementX:(z!==Ka&&(Ka&&z.type==="mousemove"?(vs=z.screenX-Ka.screenX,ys=z.screenY-Ka.screenY):ys=vs=0,Ka=z),vs)},movementY:function(z){return"movementY"in z?z.movementY:ys}}),Lc=Qn(Ko),fp=Qn(mt({},Ko,{dataTransfer:0})),bs=Qn(mt({},Qa,{relatedTarget:0})),dp=Qn(mt({},Ml,{animationName:0,elapsedTime:0,pseudoElement:0})),pp=Qn(mt({},Ml,{clipboardData:function(z){return"clipboardData"in z?z.clipboardData:window.clipboardData}})),Mc=Qn(mt({},Ml,{data:0})),hp={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},gp={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},mp={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function vp(z){var L=this.nativeEvent;return L.getModifierState?L.getModifierState(z):(z=mp[z])?!!L[z]:!1}function ws(){return vp}var yp=Qn(mt({},Qa,{key:function(z){if(z.key){var L=hp[z.key]||z.key;if(L!=="Unidentified")return L}return z.type==="keypress"?(z=Wo(z),z===13?"Enter":String.fromCharCode(z)):z.type==="keydown"||z.type==="keyup"?gp[z.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:ws,charCode:function(z){return z.type==="keypress"?Wo(z):0},keyCode:function(z){return z.type==="keydown"||z.type==="keyup"?z.keyCode:0},which:function(z){return z.type==="keypress"?Wo(z):z.type==="keydown"||z.type==="keyup"?z.keyCode:0}})),_c=Qn(mt({},Ko,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0})),bp=Qn(mt({},Qa,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:ws})),wp=Qn(mt({},Ml,{propertyName:0,elapsedTime:0,pseudoElement:0})),kp=Qn(mt({},Ko,{deltaX:function(z){return"deltaX"in z?z.deltaX:"wheelDeltaX"in z?-z.wheelDeltaX:0},deltaY:function(z){return"deltaY"in z?z.deltaY:"wheelDeltaY"in z?-z.wheelDeltaY:"wheelDelta"in z?-z.wheelDelta:0},deltaZ:0,deltaMode:0})),Sp=Qn(mt({},Ml,{newState:0,oldState:0})),xp=[9,13,27,32],ks=Rr&&"CompositionEvent"in window,Ja=null;Rr&&"documentMode"in document&&(Ja=document.documentMode);var Cp=Rr&&"TextEvent"in window&&!Ja,Dc=Rr&&(!ks||Ja&&8<Ja&&11>=Ja),Rc=" ",Oc=!1;function Ic(z,L){switch(z){case"keyup":return xp.indexOf(L.keyCode)!==-1;case"keydown":return L.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Bc(z){return z=z.detail,typeof z=="object"&&"data"in z?z.data:null}var fa=!1;function Ep(z,L){switch(z){case"compositionend":return Bc(L);case"keypress":return L.which===32?(Oc=!0,Rc):null;case"textInput":return z=L.data,z===Rc&&Oc?null:z;default:return null}}function Pp(z,L){if(fa)return z==="compositionend"||!ks&&Ic(z,L)?(z=Ac(),jo=ms=Jr=null,fa=!1,z):null;switch(z){case"paste":return null;case"keypress":if(!(L.ctrlKey||L.altKey||L.metaKey)||L.ctrlKey&&L.altKey){if(L.char&&1<L.char.length)return L.char;if(L.which)return String.fromCharCode(L.which)}return null;case"compositionend":return Dc&&L.locale!=="ko"?null:L.data;default:return null}}var Tp={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Fc(z){var L=z&&z.nodeName&&z.nodeName.toLowerCase();return L==="input"?!!Tp[z.type]:L==="textarea"}function Uc(z,L,R,I){ua?ca?ca.push(I):ca=[I]:ua=I,L=Xi(L,"onChange"),0<L.length&&(R=new Qo("onChange","change",null,R,I),z.push({event:R,listeners:L}))}var eo=null,to=null;function zp(z){w0(z,0)}function Jo(z){if(kc(ja(z)))return z}function Xc(z,L){if(z==="change")return L}var Vc=!1;if(Rr){var Ss;if(Rr){var xs="oninput"in document;if(!xs){var Yc=document.createElement("div");Yc.setAttribute("oninput","return;"),xs=typeof Yc.oninput=="function"}Ss=xs}else Ss=!1;Vc=Ss&&(!document.documentMode||9<document.documentMode)}function Gc(){eo&&(eo.detachEvent("onpropertychange",Hc),to=eo=null)}function Hc(z){if(z.propertyName==="value"&&Jo(to)){var L=[];Uc(L,to,z,ps(z)),zc(zp,L)}}function Ap(z,L,R){z==="focusin"?(Gc(),eo=L,to=R,eo.attachEvent("onpropertychange",Hc)):z==="focusout"&&Gc()}function Np(z){if(z==="selectionchange"||z==="keyup"||z==="keydown")return Jo(to)}function Lp(z,L){if(z==="click")return Jo(L)}function Mp(z,L){if(z==="input"||z==="change")return Jo(L)}function _p(z,L){return z===L&&(z!==0||1/z==1/L)||z!==z&&L!==L}var rr=typeof Object.is=="function"?Object.is:_p;function no(z,L){if(rr(z,L))return!0;if(typeof z!="object"||!z||typeof L!="object"||!L)return!1;var R=Object.keys(z),I=Object.keys(L);if(R.length!==I.length)return!1;for(I=0;I<R.length;I++){var B=R[I];if(!Kl.call(L,B)||!rr(z[B],L[B]))return!1}return!0}function $c(z){for(;z&&z.firstChild;)z=z.firstChild;return z}function qc(z,L){var R=$c(z);z=0;for(var I;R;){if(R.nodeType===3){if(I=z+R.textContent.length,z<=L&&I>=L)return{node:R,offset:L-z};z=I}e:{for(;R;){if(R.nextSibling){R=R.nextSibling;break e}R=R.parentNode}R=void 0}R=$c(R)}}function jc(z,L){return z&&L?z===L?!0:z&&z.nodeType===3?!1:L&&L.nodeType===3?jc(z,L.parentNode):"contains"in z?z.contains(L):z.compareDocumentPosition?!!(z.compareDocumentPosition(L)&16):!1:!1}function Wc(z){z=z!=null&&z.ownerDocument!=null&&z.ownerDocument.defaultView!=null?z.ownerDocument.defaultView:window;for(var L=$o(z.document);L instanceof z.HTMLIFrameElement;){try{var R=typeof L.contentWindow.location.href=="string"}catch{R=!1}if(R)z=L.contentWindow;else break;L=$o(z.document)}return L}function Cs(z){var L=z&&z.nodeName&&z.nodeName.toLowerCase();return L&&(L==="input"&&(z.type==="text"||z.type==="search"||z.type==="tel"||z.type==="url"||z.type==="password")||L==="textarea"||z.contentEditable==="true")}var Dp=Rr&&"documentMode"in document&&11>=document.documentMode,da=null,Es=null,ro=null,Ps=!1;function Zc(z,L,R){var I=R.window===R?R.document:R.nodeType===9?R:R.ownerDocument;Ps||da==null||da!==$o(I)||(I=da,"selectionStart"in I&&Cs(I)?I={start:I.selectionStart,end:I.selectionEnd}:(I=(I.ownerDocument&&I.ownerDocument.defaultView||window).getSelection(),I={anchorNode:I.anchorNode,anchorOffset:I.anchorOffset,focusNode:I.focusNode,focusOffset:I.focusOffset}),ro&&no(ro,I)||(ro=I,I=Xi(Es,"onSelect"),0<I.length&&(L=new Qo("onSelect","select",null,L,R),z.push({event:L,listeners:I}),L.target=da)))}function _l(z,L){var R={};return R[z.toLowerCase()]=L.toLowerCase(),R["Webkit"+z]="webkit"+L,R["Moz"+z]="moz"+L,R}var pa={animationend:_l("Animation","AnimationEnd"),animationiteration:_l("Animation","AnimationIteration"),animationstart:_l("Animation","AnimationStart"),transitionrun:_l("Transition","TransitionRun"),transitionstart:_l("Transition","TransitionStart"),transitioncancel:_l("Transition","TransitionCancel"),transitionend:_l("Transition","TransitionEnd")},Ts={},Qc={};Rr&&(Qc=document.createElement("div").style,"AnimationEvent"in window||(delete pa.animationend.animation,delete pa.animationiteration.animation,delete pa.animationstart.animation),"TransitionEvent"in window||delete pa.transitionend.transition);function Dl(z){if(Ts[z])return Ts[z];if(!pa[z])return z;var L=pa[z],R;for(R in L)if(L.hasOwnProperty(R)&&R in Qc)return Ts[z]=L[R];return z}var Kc=Dl("animationend"),Jc=Dl("animationiteration"),ef=Dl("animationstart"),Rp=Dl("transitionrun"),Op=Dl("transitionstart"),Ip=Dl("transitioncancel"),tf=Dl("transitionend"),nf=new Map,zs="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");zs.push("scrollEnd");function Sr(z,L){nf.set(z,L),Ll(L,[z])}var ei=typeof reportError=="function"?reportError:function(z){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var L=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof z=="object"&&z&&typeof z.message=="string"?String(z.message):String(z),error:z});if(!window.dispatchEvent(L))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",z);return}console.error(z)},dr=[],ha=0,As=0;function ti(){for(var z=ha,L=As=ha=0;L<z;){var R=dr[L];dr[L++]=null;var I=dr[L];dr[L++]=null;var B=dr[L];dr[L++]=null;var F=dr[L];if(dr[L++]=null,I!==null&&B!==null){var U=I.pending;U===null?B.next=B:(B.next=U.next,U.next=B),I.pending=B}F!==0&&rf(R,B,F)}}function ni(z,L,R,I){dr[ha++]=z,dr[ha++]=L,dr[ha++]=R,dr[ha++]=I,As|=I,z.lanes|=I,z=z.alternate,z!==null&&(z.lanes|=I)}function Ns(z,L,R,I){return ni(z,L,R,I),ri(z)}function Rl(z,L){return ni(z,null,null,L),ri(z)}function rf(z,L,R){z.lanes|=R;var I=z.alternate;I!==null&&(I.lanes|=R);for(var B=!1,F=z.return;F!==null;)F.childLanes|=R,I=F.alternate,I!==null&&(I.childLanes|=R),F.tag===22&&(z=F.stateNode,z===null||z._visibility&1||(B=!0)),z=F,F=F.return;return z.tag===3?(F=z.stateNode,B&&L!==null&&(B=31-Xn(R),z=F.hiddenUpdates,I=z[B],I===null?z[B]=[L]:I.push(L),L.lane=R|536870912),F):null}function ri(z){if(50<Po)throw Po=0,Fu=null,Error(X(185));for(var L=z.return;L!==null;)z=L,L=z.return;return z.tag===3?z.stateNode:null}var ga={};function Bp(z,L,R,I){this.tag=z,this.key=R,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=L,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=I,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function lr(z,L,R,I){return new Bp(z,L,R,I)}function Ls(z){return z=z.prototype,!(!z||!z.isReactComponent)}function Or(z,L){var R=z.alternate;return R===null?(R=lr(z.tag,L,z.key,z.mode),R.elementType=z.elementType,R.type=z.type,R.stateNode=z.stateNode,R.alternate=z,z.alternate=R):(R.pendingProps=L,R.type=z.type,R.flags=0,R.subtreeFlags=0,R.deletions=null),R.flags=z.flags&65011712,R.childLanes=z.childLanes,R.lanes=z.lanes,R.child=z.child,R.memoizedProps=z.memoizedProps,R.memoizedState=z.memoizedState,R.updateQueue=z.updateQueue,L=z.dependencies,R.dependencies=L===null?null:{lanes:L.lanes,firstContext:L.firstContext},R.sibling=z.sibling,R.index=z.index,R.ref=z.ref,R.refCleanup=z.refCleanup,R}function lf(z,L){z.flags&=65011714;var R=z.alternate;return R===null?(z.childLanes=0,z.lanes=L,z.child=null,z.subtreeFlags=0,z.memoizedProps=null,z.memoizedState=null,z.updateQueue=null,z.dependencies=null,z.stateNode=null):(z.childLanes=R.childLanes,z.lanes=R.lanes,z.child=R.child,z.subtreeFlags=0,z.deletions=null,z.memoizedProps=R.memoizedProps,z.memoizedState=R.memoizedState,z.updateQueue=R.updateQueue,z.type=R.type,L=R.dependencies,z.dependencies=L===null?null:{lanes:L.lanes,firstContext:L.firstContext}),z}function li(z,L,R,I,B,F){var U=0;if(I=z,typeof z=="function")Ls(z)&&(U=1);else if(typeof z=="string")U=Gh(z,R,Ht.current)?26:z==="html"||z==="head"||z==="body"?27:5;else e:switch(z){case Ft:return z=lr(31,R,L,B),z.elementType=Ft,z.lanes=F,z;case qt:return Ol(R.children,B,F,L);case Yt:U=8,B|=24;break;case xt:return z=lr(12,R,L,B|2),z.elementType=xt,z.lanes=F,z;case $t:return z=lr(13,R,L,B),z.elementType=$t,z.lanes=F,z;case Bt:return z=lr(19,R,L,B),z.elementType=Bt,z.lanes=F,z;default:if(typeof z=="object"&&z)switch(z.$$typeof){case Nt:U=10;break e;case Rt:U=9;break e;case Kt:U=11;break e;case _t:U=14;break e;case Gt:U=16,I=null;break e}U=29,R=Error(X(130,z===null?"null":typeof z,"")),I=null}return L=lr(U,R,L,B),L.elementType=z,L.type=I,L.lanes=F,L}function Ol(z,L,R,I){return z=lr(7,z,I,L),z.lanes=R,z}function Ms(z,L,R){return z=lr(6,z,null,L),z.lanes=R,z}function af(z){var L=lr(18,null,null,0);return L.stateNode=z,L}function _s(z,L,R){return L=lr(4,z.children===null?[]:z.children,z.key,L),L.lanes=R,L.stateNode={containerInfo:z.containerInfo,pendingChildren:null,implementation:z.implementation},L}var of=new WeakMap;function pr(z,L){if(typeof z=="object"&&z){var R=of.get(z);return R===void 0?(L={value:z,source:L,stack:Xa(L)},of.set(z,L),L):R}return{value:z,source:L,stack:Xa(L)}}var ma=[],va=0,ai=null,lo=0,hr=[],gr=0,el=null,Tr=1,zr="";function Ir(z,L){ma[va++]=lo,ma[va++]=ai,ai=z,lo=L}function sf(z,L,R){hr[gr++]=Tr,hr[gr++]=zr,hr[gr++]=el,el=z;var I=Tr;z=zr;var B=32-Xn(I)-1;I&=~(1<<B),R+=1;var F=32-Xn(L)+B;if(30<F){var U=B-B%5;F=(I&(1<<U)-1).toString(32),I>>=U,B-=U,Tr=1<<32-Xn(L)+B|R<<B|I,zr=F+z}else Tr=1<<F|R<<B|I,zr=z}function Ds(z){z.return!==null&&(Ir(z,1),sf(z,1,0))}function Rs(z){for(;z===ai;)ai=ma[--va],ma[va]=null,lo=ma[--va],ma[va]=null;for(;z===el;)el=hr[--gr],hr[gr]=null,zr=hr[--gr],hr[gr]=null,Tr=hr[--gr],hr[gr]=null}function uf(z,L){hr[gr++]=Tr,hr[gr++]=zr,hr[gr++]=el,Tr=L.id,zr=L.overflow,el=z}var Vn=null,Pn=null,pn=!1,tl=null,mr=!1,Os=Error(X(519));function nl(z){throw ao(pr(Error(X(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML","")),z)),Os}function cf(z){var L=z.stateNode,R=z.type,I=z.memoizedProps;switch(L[_n]=z,L[qn]=I,R){case"dialog":cn("cancel",L),cn("close",L);break;case"iframe":case"object":case"embed":cn("load",L);break;case"video":case"audio":for(R=0;R<zo.length;R++)cn(zo[R],L);break;case"source":cn("error",L);break;case"img":case"image":case"link":cn("error",L),cn("load",L);break;case"details":cn("toggle",L);break;case"input":cn("invalid",L),Sc(L,I.value,I.defaultValue,I.checked,I.defaultChecked,I.type,I.name,!0);break;case"select":cn("invalid",L);break;case"textarea":cn("invalid",L),Cc(L,I.value,I.defaultValue,I.children)}R=I.children,typeof R!="string"&&typeof R!="number"&&typeof R!="bigint"||L.textContent===""+R||I.suppressHydrationWarning===!0||E0(L.textContent,R)?(I.popover!=null&&(cn("beforetoggle",L),cn("toggle",L)),I.onScroll!=null&&cn("scroll",L),I.onScrollEnd!=null&&cn("scrollend",L),I.onClick!=null&&(L.onclick=Dr),L=!0):L=!1,L||nl(z,!0)}function ff(z){for(Vn=z.return;Vn;)switch(Vn.tag){case 5:case 31:case 13:mr=!1;return;case 27:case 3:mr=!0;return;default:Vn=Vn.return}}function ya(z){if(z!==Vn)return!1;if(!pn)return ff(z),pn=!0,!1;var L=z.tag,R;if((R=L!==3&&L!==27)&&((R=L===5)&&(R=z.type,R=!(R!=="form"&&R!=="button")||Ju(z.type,z.memoizedProps)),R=!R),R&&Pn&&nl(z),ff(z),L===13){if(z=z.memoizedState,z=z===null?null:z.dehydrated,!z)throw Error(X(317));Pn=D0(z)}else if(L===31){if(z=z.memoizedState,z=z===null?null:z.dehydrated,!z)throw Error(X(317));Pn=D0(z)}else L===27?(L=Pn,hl(z.type)?(z=lc,lc=null,Pn=z):Pn=L):Pn=Vn?yr(z.stateNode.nextSibling):null;return!0}function Il(){Pn=Vn=null,pn=!1}function Is(){var z=tl;return z!==null&&(tr===null?tr=z:tr.push.apply(tr,z),tl=null),z}function ao(z){tl===null?tl=[z]:tl.push(z)}var Bs=K(null),Bl=null,Br=null;function rl(z,L,R){Mt(Bs,L._currentValue),L._currentValue=R}function Fr(z){z._currentValue=Bs.current,St(Bs)}function Fs(z,L,R){for(;z!==null;){var I=z.alternate;if((z.childLanes&L)===L?I!==null&&(I.childLanes&L)!==L&&(I.childLanes|=L):(z.childLanes|=L,I!==null&&(I.childLanes|=L)),z===R)break;z=z.return}}function Us(z,L,R,I){var B=z.child;for(B!==null&&(B.return=z);B!==null;){var F=B.dependencies;if(F!==null){var U=B.child;F=F.firstContext;e:for(;F!==null;){var V=F;F=B;for(var W=0;W<L.length;W++)if(V.context===L[W]){F.lanes|=R,V=F.alternate,V!==null&&(V.lanes|=R),Fs(F.return,R,z),I||(U=null);break e}F=V.next}}else if(B.tag===18){if(U=B.return,U===null)throw Error(X(341));U.lanes|=R,F=U.alternate,F!==null&&(F.lanes|=R),Fs(U,R,z),U=null}else U=B.child;if(U!==null)U.return=B;else for(U=B;U!==null;){if(U===z){U=null;break}if(B=U.sibling,B!==null){B.return=U.return,U=B;break}U=U.return}B=U}}function ba(z,L,R,I){z=null;for(var B=L,F=!1;B!==null;){if(!F){if(B.flags&524288)F=!0;else if(B.flags&262144)break}if(B.tag===10){var U=B.alternate;if(U===null)throw Error(X(387));if(U=U.memoizedProps,U!==null){var V=B.type;rr(B.pendingProps.value,U.value)||(z===null?z=[V]:z.push(V))}}else if(B===ln.current){if(U=B.alternate,U===null)throw Error(X(387));U.memoizedState.memoizedState!==B.memoizedState.memoizedState&&(z===null?z=[_o]:z.push(_o))}B=B.return}z!==null&&Us(L,z,R,I),L.flags|=262144}function oi(z){for(z=z.firstContext;z!==null;){if(!rr(z.context._currentValue,z.memoizedValue))return!0;z=z.next}return!1}function Fl(z){Bl=z,Br=null,z=z.dependencies,z!==null&&(z.firstContext=null)}function Yn(z){return df(Bl,z)}function ii(z,L){return Bl===null&&Fl(z),df(z,L)}function df(z,L){var R=L._currentValue;if(L={context:L,memoizedValue:R,next:null},Br===null){if(z===null)throw Error(X(308));Br=L,z.dependencies={lanes:0,firstContext:L},z.flags|=524288}else Br=Br.next=L;return R}var Fp=typeof AbortController<"u"?AbortController:function(){var z=[],L=this.signal={aborted:!1,addEventListener:function(R,I){z.push(I)}};this.abort=function(){L.aborted=!0,z.forEach(function(R){return R()})}},Up=$.unstable_scheduleCallback,Xp=$.unstable_NormalPriority,Dn={$$typeof:Nt,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Xs(){return{controller:new Fp,data:new Map,refCount:0}}function oo(z){z.refCount--,z.refCount===0&&Up(Xp,function(){z.controller.abort()})}var io=null,Vs=0,wa=0,ka=null;function Vp(z,L){if(io===null){var R=io=[];Vs=0,wa=Hu(),ka={status:"pending",value:void 0,then:function(I){R.push(I)}}}return Vs++,L.then(pf,pf),L}function pf(){if(--Vs===0&&io!==null){ka!==null&&(ka.status="fulfilled");var z=io;io=null,wa=0,ka=null;for(var L=0;L<z.length;L++)(0,z[L])()}}function Yp(z,L){var R=[],I={status:"pending",value:null,reason:null,then:function(B){R.push(B)}};return z.then(function(){I.status="fulfilled",I.value=L;for(var B=0;B<R.length;B++)(0,R[B])(L)},function(B){for(I.status="rejected",I.reason=B,B=0;B<R.length;B++)(0,R[B])(void 0)}),I}var hf=Tt.S;Tt.S=function(z,L){jd=$n(),typeof L=="object"&&L&&typeof L.then=="function"&&Vp(z,L),hf!==null&&hf(z,L)};var Ul=K(null);function Ys(){var z=Ul.current;return z===null?En.pooledCache:z}function si(z,L){L===null?Mt(Ul,Ul.current):Mt(Ul,L.pool)}function gf(){var z=Ys();return z===null?null:{parent:Dn._currentValue,pool:z}}var Sa=Error(X(460)),Gs=Error(X(474)),ui=Error(X(542)),ci={then:function(){}};function mf(z){return z=z.status,z==="fulfilled"||z==="rejected"}function vf(z,L,R){switch(R=z[R],R===void 0?z.push(L):R!==L&&(L.then(Dr,Dr),L=R),L.status){case"fulfilled":return L.value;case"rejected":throw z=L.reason,bf(z),z;default:if(typeof L.status=="string")L.then(Dr,Dr);else{if(z=En,z!==null&&100<z.shellSuspendCounter)throw Error(X(482));z=L,z.status="pending",z.then(function(I){if(L.status==="pending"){var B=L;B.status="fulfilled",B.value=I}},function(I){if(L.status==="pending"){var B=L;B.status="rejected",B.reason=I}})}switch(L.status){case"fulfilled":return L.value;case"rejected":throw z=L.reason,bf(z),z}throw Vl=L,Sa}}function Xl(z){try{var L=z._init;return L(z._payload)}catch(R){throw typeof R=="object"&&R&&typeof R.then=="function"?(Vl=R,Sa):R}}var Vl=null;function yf(){if(Vl===null)throw Error(X(459));var z=Vl;return Vl=null,z}function bf(z){if(z===Sa||z===ui)throw Error(X(483))}var xa=null,so=0;function fi(z){var L=so;return so+=1,xa===null&&(xa=[]),vf(xa,z,L)}function uo(z,L){L=L.props.ref,z.ref=L===void 0?null:L}function di(z,L){throw L.$$typeof===At?Error(X(525)):(z=Object.prototype.toString.call(L),Error(X(31,z==="[object Object]"?"object with keys {"+Object.keys(L).join(", ")+"}":z)))}function wf(z){function L(gt,J){if(z){var vt=gt.deletions;vt===null?(gt.deletions=[J],gt.flags|=16):vt.push(J)}}function R(gt,J){if(!z)return null;for(;J!==null;)L(gt,J),J=J.sibling;return null}function I(gt){for(var J=new Map;gt!==null;)gt.key===null?J.set(gt.index,gt):J.set(gt.key,gt),gt=gt.sibling;return J}function B(gt,J){return gt=Or(gt,J),gt.index=0,gt.sibling=null,gt}function F(gt,J,vt){return gt.index=vt,z?(vt=gt.alternate,vt===null?(gt.flags|=67108866,J):(vt=vt.index,vt<J?(gt.flags|=67108866,J):vt)):(gt.flags|=1048576,J)}function U(gt){return z&&gt.alternate===null&&(gt.flags|=67108866),gt}function V(gt,J,vt,Et){return J===null||J.tag!==6?(J=Ms(vt,gt.mode,Et),J.return=gt,J):(J=B(J,vt),J.return=gt,J)}function W(gt,J,vt,Et){var en=vt.type;return en===qt?Ct(gt,J,vt.props.children,Et,vt.key):J!==null&&(J.elementType===en||typeof en=="object"&&en&&en.$$typeof===Gt&&Xl(en)===J.type)?(J=B(J,vt.props),uo(J,vt),J.return=gt,J):(J=li(vt.type,vt.key,vt.props,null,gt.mode,Et),uo(J,vt),J.return=gt,J)}function yt(gt,J,vt,Et){return J===null||J.tag!==4||J.stateNode.containerInfo!==vt.containerInfo||J.stateNode.implementation!==vt.implementation?(J=_s(vt,gt.mode,Et),J.return=gt,J):(J=B(J,vt.children||[]),J.return=gt,J)}function Ct(gt,J,vt,Et,en){return J===null||J.tag!==7?(J=Ol(vt,gt.mode,Et,en),J.return=gt,J):(J=B(J,vt),J.return=gt,J)}function zt(gt,J,vt){if(typeof J=="string"&&J!==""||typeof J=="number"||typeof J=="bigint")return J=Ms(""+J,gt.mode,vt),J.return=gt,J;if(typeof J=="object"&&J){switch(J.$$typeof){case It:return vt=li(J.type,J.key,J.props,null,gt.mode,vt),uo(vt,J),vt.return=gt,vt;case Xt:return J=_s(J,gt.mode,vt),J.return=gt,J;case Gt:return J=Xl(J),zt(gt,J,vt)}if(Dt(J)||Ot(J))return J=Ol(J,gt.mode,vt,null),J.return=gt,J;if(typeof J.then=="function")return zt(gt,fi(J),vt);if(J.$$typeof===Nt)return zt(gt,ii(gt,J),vt);di(gt,J)}return null}function bt(gt,J,vt,Et){var en=J===null?null:J.key;if(typeof vt=="string"&&vt!==""||typeof vt=="number"||typeof vt=="bigint")return en===null?V(gt,J,""+vt,Et):null;if(typeof vt=="object"&&vt){switch(vt.$$typeof){case It:return vt.key===en?W(gt,J,vt,Et):null;case Xt:return vt.key===en?yt(gt,J,vt,Et):null;case Gt:return vt=Xl(vt),bt(gt,J,vt,Et)}if(Dt(vt)||Ot(vt))return en===null?Ct(gt,J,vt,Et,null):null;if(typeof vt.then=="function")return bt(gt,J,fi(vt),Et);if(vt.$$typeof===Nt)return bt(gt,J,ii(gt,vt),Et);di(gt,vt)}return null}function wt(gt,J,vt,Et,en){if(typeof Et=="string"&&Et!==""||typeof Et=="number"||typeof Et=="bigint")return gt=gt.get(vt)||null,V(J,gt,""+Et,en);if(typeof Et=="object"&&Et){switch(Et.$$typeof){case It:return gt=gt.get(Et.key===null?vt:Et.key)||null,W(J,gt,Et,en);case Xt:return gt=gt.get(Et.key===null?vt:Et.key)||null,yt(J,gt,Et,en);case Gt:return Et=Xl(Et),wt(gt,J,vt,Et,en)}if(Dt(Et)||Ot(Et))return gt=gt.get(vt)||null,Ct(J,gt,Et,en,null);if(typeof Et.then=="function")return wt(gt,J,vt,fi(Et),en);if(Et.$$typeof===Nt)return wt(gt,J,vt,ii(J,Et),en);di(J,Et)}return null}function jt(gt,J,vt,Et){for(var en=null,mn=null,Zt=J,on=J=0,dn=null;Zt!==null&&on<vt.length;on++){Zt.index>on?(dn=Zt,Zt=null):dn=Zt.sibling;var hn=bt(gt,Zt,vt[on],Et);if(hn===null){Zt===null&&(Zt=dn);break}z&&Zt&&hn.alternate===null&&L(gt,Zt),J=F(hn,J,on),mn===null?en=hn:mn.sibling=hn,mn=hn,Zt=dn}if(on===vt.length)return R(gt,Zt),pn&&Ir(gt,on),en;if(Zt===null){for(;on<vt.length;on++)Zt=zt(gt,vt[on],Et),Zt!==null&&(J=F(Zt,J,on),mn===null?en=Zt:mn.sibling=Zt,mn=Zt);return pn&&Ir(gt,on),en}for(Zt=I(Zt);on<vt.length;on++)dn=wt(Zt,gt,on,vt[on],Et),dn!==null&&(z&&dn.alternate!==null&&Zt.delete(dn.key===null?on:dn.key),J=F(dn,J,on),mn===null?en=dn:mn.sibling=dn,mn=dn);return z&&Zt.forEach(function(bl){return L(gt,bl)}),pn&&Ir(gt,on),en}function rn(gt,J,vt,Et){if(vt==null)throw Error(X(151));for(var en=null,mn=null,Zt=J,on=J=0,dn=null,hn=vt.next();Zt!==null&&!hn.done;on++,hn=vt.next()){Zt.index>on?(dn=Zt,Zt=null):dn=Zt.sibling;var bl=bt(gt,Zt,hn.value,Et);if(bl===null){Zt===null&&(Zt=dn);break}z&&Zt&&bl.alternate===null&&L(gt,Zt),J=F(bl,J,on),mn===null?en=bl:mn.sibling=bl,mn=bl,Zt=dn}if(hn.done)return R(gt,Zt),pn&&Ir(gt,on),en;if(Zt===null){for(;!hn.done;on++,hn=vt.next())hn=zt(gt,hn.value,Et),hn!==null&&(J=F(hn,J,on),mn===null?en=hn:mn.sibling=hn,mn=hn);return pn&&Ir(gt,on),en}for(Zt=I(Zt);!hn.done;on++,hn=vt.next())hn=wt(Zt,gt,on,hn.value,Et),hn!==null&&(z&&hn.alternate!==null&&Zt.delete(hn.key===null?on:hn.key),J=F(hn,J,on),mn===null?en=hn:mn.sibling=hn,mn=hn);return z&&Zt.forEach(function(lg){return L(gt,lg)}),pn&&Ir(gt,on),en}function Cn(gt,J,vt,Et){if(typeof vt=="object"&&vt&&vt.type===qt&&vt.key===null&&(vt=vt.props.children),typeof vt=="object"&&vt){switch(vt.$$typeof){case It:e:{for(var en=vt.key;J!==null;){if(J.key===en){if(en=vt.type,en===qt){if(J.tag===7){R(gt,J.sibling),Et=B(J,vt.props.children),Et.return=gt,gt=Et;break e}}else if(J.elementType===en||typeof en=="object"&&en&&en.$$typeof===Gt&&Xl(en)===J.type){R(gt,J.sibling),Et=B(J,vt.props),uo(Et,vt),Et.return=gt,gt=Et;break e}R(gt,J);break}else L(gt,J);J=J.sibling}vt.type===qt?(Et=Ol(vt.props.children,gt.mode,Et,vt.key),Et.return=gt,gt=Et):(Et=li(vt.type,vt.key,vt.props,null,gt.mode,Et),uo(Et,vt),Et.return=gt,gt=Et)}return U(gt);case Xt:e:{for(en=vt.key;J!==null;){if(J.key===en)if(J.tag===4&&J.stateNode.containerInfo===vt.containerInfo&&J.stateNode.implementation===vt.implementation){R(gt,J.sibling),Et=B(J,vt.children||[]),Et.return=gt,gt=Et;break e}else{R(gt,J);break}else L(gt,J);J=J.sibling}Et=_s(vt,gt.mode,Et),Et.return=gt,gt=Et}return U(gt);case Gt:return vt=Xl(vt),Cn(gt,J,vt,Et)}if(Dt(vt))return jt(gt,J,vt,Et);if(Ot(vt)){if(en=Ot(vt),typeof en!="function")throw Error(X(150));return vt=en.call(vt),rn(gt,J,vt,Et)}if(typeof vt.then=="function")return Cn(gt,J,fi(vt),Et);if(vt.$$typeof===Nt)return Cn(gt,J,ii(gt,vt),Et);di(gt,vt)}return typeof vt=="string"&&vt!==""||typeof vt=="number"||typeof vt=="bigint"?(vt=""+vt,J!==null&&J.tag===6?(R(gt,J.sibling),Et=B(J,vt),Et.return=gt,gt=Et):(R(gt,J),Et=Ms(vt,gt.mode,Et),Et.return=gt,gt=Et),U(gt)):R(gt,J)}return function(gt,J,vt,Et){try{so=0;var en=Cn(gt,J,vt,Et);return xa=null,en}catch(Zt){if(Zt===Sa||Zt===ui)throw Zt;var mn=lr(29,Zt,null,gt.mode);return mn.lanes=Et,mn.return=gt,mn}}}var Yl=wf(!0),kf=wf(!1),ll=!1;function Hs(z){z.updateQueue={baseState:z.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function $s(z,L){z=z.updateQueue,L.updateQueue===z&&(L.updateQueue={baseState:z.baseState,firstBaseUpdate:z.firstBaseUpdate,lastBaseUpdate:z.lastBaseUpdate,shared:z.shared,callbacks:null})}function Gl(z){return{lane:z,tag:0,payload:null,callback:null,next:null}}function Hl(z,L,R){var I=z.updateQueue;if(I===null)return null;if(I=I.shared,gn&2){var B=I.pending;return B===null?L.next=L:(L.next=B.next,B.next=L),I.pending=L,L=ri(z),rf(z,null,R),L}return ni(z,I,L,R),ri(z)}function co(z,L,R){if(L=L.updateQueue,L!==null&&(L=L.shared,R&4194048)){var I=L.lanes;I&=z.pendingLanes,R|=I,L.lanes=R,Al(z,R)}}function qs(z,L){var R=z.updateQueue,I=z.alternate;if(I!==null&&(I=I.updateQueue,R===I)){var B=null,F=null;if(R=R.firstBaseUpdate,R!==null){do{var U={lane:R.lane,tag:R.tag,payload:R.payload,callback:null,next:null};F===null?B=F=U:F=F.next=U,R=R.next}while(R!==null);F===null?B=F=L:F=F.next=L}else B=F=L;R={baseState:I.baseState,firstBaseUpdate:B,lastBaseUpdate:F,shared:I.shared,callbacks:I.callbacks},z.updateQueue=R;return}z=R.lastBaseUpdate,z===null?R.firstBaseUpdate=L:z.next=L,R.lastBaseUpdate=L}var js=!1;function fo(){if(js){var z=ka;if(z!==null)throw z}}function po(z,L,R,I){js=!1;var B=z.updateQueue;ll=!1;var F=B.firstBaseUpdate,U=B.lastBaseUpdate,V=B.shared.pending;if(V!==null){B.shared.pending=null;var W=V,yt=W.next;W.next=null,U===null?F=yt:U.next=yt,U=W;var Ct=z.alternate;Ct!==null&&(Ct=Ct.updateQueue,V=Ct.lastBaseUpdate,V!==U&&(V===null?Ct.firstBaseUpdate=yt:V.next=yt,Ct.lastBaseUpdate=W))}if(F!==null){var zt=B.baseState;U=0,Ct=yt=W=null,V=F;do{var bt=V.lane&-536870913,wt=bt!==V.lane;if(wt?(fn&bt)===bt:(I&bt)===bt){bt!==0&&bt===wa&&(js=!0),Ct!==null&&(Ct=Ct.next={lane:0,tag:V.tag,payload:V.payload,callback:null,next:null});e:{var jt=z,rn=V;bt=L;var Cn=R;switch(rn.tag){case 1:if(jt=rn.payload,typeof jt=="function"){zt=jt.call(Cn,zt,bt);break e}zt=jt;break e;case 3:jt.flags=jt.flags&-65537|128;case 0:if(jt=rn.payload,bt=typeof jt=="function"?jt.call(Cn,zt,bt):jt,bt==null)break e;zt=mt({},zt,bt);break e;case 2:ll=!0}}bt=V.callback,bt!==null&&(z.flags|=64,wt&&(z.flags|=8192),wt=B.callbacks,wt===null?B.callbacks=[bt]:wt.push(bt))}else wt={lane:bt,tag:V.tag,payload:V.payload,callback:V.callback,next:null},Ct===null?(yt=Ct=wt,W=zt):Ct=Ct.next=wt,U|=bt;if(V=V.next,V===null){if(V=B.shared.pending,V===null)break;wt=V,V=wt.next,wt.next=null,B.lastBaseUpdate=wt,B.shared.pending=null}}while(!0);Ct===null&&(W=zt),B.baseState=W,B.firstBaseUpdate=yt,B.lastBaseUpdate=Ct,F===null&&(B.shared.lanes=0),ul|=U,z.lanes=U,z.memoizedState=zt}}function Sf(z,L){if(typeof z!="function")throw Error(X(191,z));z.call(L)}function xf(z,L){var R=z.callbacks;if(R!==null)for(z.callbacks=null,z=0;z<R.length;z++)Sf(R[z],L)}var Ca=K(null),pi=K(0);function Cf(z,L){z=jr,Mt(pi,z),Mt(Ca,L),jr=z|L.baseLanes}function Ws(){Mt(pi,jr),Mt(Ca,Ca.current)}function Zs(){jr=pi.current,St(Ca),St(pi)}var ar=K(null),xr=null;function al(z){var L=z.alternate;Mt(Ln,Ln.current&1),Mt(ar,z),xr===null&&(L===null||Ca.current!==null||L.memoizedState!==null)&&(xr=z)}function Qs(z){Mt(Ln,Ln.current),Mt(ar,z),xr===null&&(xr=z)}function Ef(z){z.tag===22?(Mt(Ln,Ln.current),Mt(ar,z),xr===null&&(xr=z)):ol(z)}function ol(){Mt(Ln,Ln.current),Mt(ar,ar.current)}function or(z){St(ar),xr===z&&(xr=null),St(Ln)}var Ln=K(0);function hi(z){for(var L=z;L!==null;){if(L.tag===13){var R=L.memoizedState;if(R!==null&&(R=R.dehydrated,R===null||nc(R)||rc(R)))return L}else if(L.tag===19&&(L.memoizedProps.revealOrder==="forwards"||L.memoizedProps.revealOrder==="backwards"||L.memoizedProps.revealOrder==="unstable_legacy-backwards"||L.memoizedProps.revealOrder==="together")){if(L.flags&128)return L}else if(L.child!==null){L.child.return=L,L=L.child;continue}if(L===z)break;for(;L.sibling===null;){if(L.return===null||L.return===z)return null;L=L.return}L.sibling.return=L.return,L=L.sibling}return null}var Ur=0,an=null,Sn=null,Rn=null,gi=!1,Ea=!1,$l=!1,mi=0,ho=0,Pa=null,Gp=0;function An(){throw Error(X(321))}function Ks(z,L){if(L===null)return!1;for(var R=0;R<L.length&&R<z.length;R++)if(!rr(z[R],L[R]))return!1;return!0}function Js(z,L,R,I,B,F){return Ur=F,an=L,L.memoizedState=null,L.updateQueue=null,L.lanes=0,Tt.H=z===null||z.memoizedState===null?sd:hu,$l=!1,F=R(I,B),$l=!1,Ea&&(F=Tf(L,R,I,B)),Pf(z),F}function Pf(z){Tt.H=vo;var L=Sn!==null&&Sn.next!==null;if(Ur=0,Rn=Sn=an=null,gi=!1,ho=0,Pa=null,L)throw Error(X(300));z===null||On||(z=z.dependencies,z!==null&&oi(z)&&(On=!0))}function Tf(z,L,R,I){an=z;var B=0;do{if(Ea&&(Pa=null),ho=0,Ea=!1,25<=B)throw Error(X(301));if(B+=1,Rn=Sn=null,z.updateQueue!=null){var F=z.updateQueue;F.lastEffect=null,F.events=null,F.stores=null,F.memoCache!=null&&(F.memoCache.index=0)}Tt.H=ud,F=L(R,I)}while(Ea);return F}function Hp(){var z=Tt.H,L=z.useState()[0];return L=typeof L.then=="function"?go(L):L,z=z.useState()[0],(Sn===null?null:Sn.memoizedState)!==z&&(an.flags|=1024),L}function eu(){var z=mi!==0;return mi=0,z}function tu(z,L,R){L.updateQueue=z.updateQueue,L.flags&=-2053,z.lanes&=~R}function nu(z){if(gi){for(z=z.memoizedState;z!==null;){var L=z.queue;L!==null&&(L.pending=null),z=z.next}gi=!1}Ur=0,Rn=Sn=an=null,Ea=!1,ho=mi=0,Pa=null}function Wn(){var z={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Rn===null?an.memoizedState=Rn=z:Rn=Rn.next=z,Rn}function Mn(){if(Sn===null){var z=an.alternate;z=z===null?null:z.memoizedState}else z=Sn.next;var L=Rn===null?an.memoizedState:Rn.next;if(L!==null)Rn=L,Sn=z;else{if(z===null)throw an.alternate===null?Error(X(467)):Error(X(310));Sn=z,z={memoizedState:Sn.memoizedState,baseState:Sn.baseState,baseQueue:Sn.baseQueue,queue:Sn.queue,next:null},Rn===null?an.memoizedState=Rn=z:Rn=Rn.next=z}return Rn}function vi(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function go(z){var L=ho;return ho+=1,Pa===null&&(Pa=[]),z=vf(Pa,z,L),L=an,(Rn===null?L.memoizedState:Rn.next)===null&&(L=L.alternate,Tt.H=L===null||L.memoizedState===null?sd:hu),z}function yi(z){if(typeof z=="object"&&z){if(typeof z.then=="function")return go(z);if(z.$$typeof===Nt)return Yn(z)}throw Error(X(438,String(z)))}function ru(z){var L=null,R=an.updateQueue;if(R!==null&&(L=R.memoCache),L==null){var I=an.alternate;I!==null&&(I=I.updateQueue,I!==null&&(I=I.memoCache,I!=null&&(L={data:I.data.map(function(B){return B.slice()}),index:0})))}if(L??(L={data:[],index:0}),R===null&&(R=vi(),an.updateQueue=R),R.memoCache=L,R=L.data[L.index],R===void 0)for(R=L.data[L.index]=Array(z),I=0;I<z;I++)R[I]=Ut;return L.index++,R}function Xr(z,L){return typeof L=="function"?L(z):L}function bi(z){return lu(Mn(),Sn,z)}function lu(z,L,R){var I=z.queue;if(I===null)throw Error(X(311));I.lastRenderedReducer=R;var B=z.baseQueue,F=I.pending;if(F!==null){if(B!==null){var U=B.next;B.next=F.next,F.next=U}L.baseQueue=B=F,I.pending=null}if(F=z.baseState,B===null)z.memoizedState=F;else{L=B.next;var V=U=null,W=null,yt=L,Ct=!1;do{var zt=yt.lane&-536870913;if(zt===yt.lane?(Ur&zt)===zt:(fn&zt)===zt){var bt=yt.revertLane;if(bt===0)W!==null&&(W=W.next={lane:0,revertLane:0,gesture:null,action:yt.action,hasEagerState:yt.hasEagerState,eagerState:yt.eagerState,next:null}),zt===wa&&(Ct=!0);else if((Ur&bt)===bt){yt=yt.next,bt===wa&&(Ct=!0);continue}else zt={lane:0,revertLane:yt.revertLane,gesture:null,action:yt.action,hasEagerState:yt.hasEagerState,eagerState:yt.eagerState,next:null},W===null?(V=W=zt,U=F):W=W.next=zt,an.lanes|=bt,ul|=bt;zt=yt.action,$l&&R(F,zt),F=yt.hasEagerState?yt.eagerState:R(F,zt)}else bt={lane:zt,revertLane:yt.revertLane,gesture:yt.gesture,action:yt.action,hasEagerState:yt.hasEagerState,eagerState:yt.eagerState,next:null},W===null?(V=W=bt,U=F):W=W.next=bt,an.lanes|=zt,ul|=zt;yt=yt.next}while(yt!==null&&yt!==L);if(W===null?U=F:W.next=V,!rr(F,z.memoizedState)&&(On=!0,Ct&&(R=ka,R!==null)))throw R;z.memoizedState=F,z.baseState=U,z.baseQueue=W,I.lastRenderedState=F}return B===null&&(I.lanes=0),[z.memoizedState,I.dispatch]}function au(z){var L=Mn(),R=L.queue;if(R===null)throw Error(X(311));R.lastRenderedReducer=z;var I=R.dispatch,B=R.pending,F=L.memoizedState;if(B!==null){R.pending=null;var U=B=B.next;do F=z(F,U.action),U=U.next;while(U!==B);rr(F,L.memoizedState)||(On=!0),L.memoizedState=F,L.baseQueue===null&&(L.baseState=F),R.lastRenderedState=F}return[F,I]}function zf(z,L,R){var I=an,B=Mn(),F=pn;if(F){if(R===void 0)throw Error(X(407));R=R()}else R=L();var U=!rr((Sn||B).memoizedState,R);if(U&&(B.memoizedState=R,On=!0),B=B.queue,su(Lf.bind(null,I,B,z),[z]),B.getSnapshot!==L||U||Rn!==null&&Rn.memoizedState.tag&1){if(I.flags|=2048,Ta(9,{destroy:void 0},Nf.bind(null,I,B,R,L),null),En===null)throw Error(X(349));F||Ur&127||Af(I,L,R)}return R}function Af(z,L,R){z.flags|=16384,z={getSnapshot:L,value:R},L=an.updateQueue,L===null?(L=vi(),an.updateQueue=L,L.stores=[z]):(R=L.stores,R===null?L.stores=[z]:R.push(z))}function Nf(z,L,R,I){L.value=R,L.getSnapshot=I,Mf(L)&&_f(z)}function Lf(z,L,R){return R(function(){Mf(L)&&_f(z)})}function Mf(z){var L=z.getSnapshot;z=z.value;try{var R=L();return!rr(z,R)}catch{return!0}}function _f(z){var L=Rl(z,2);L!==null&&nr(L,z,2)}function ou(z){var L=Wn();if(typeof z=="function"){var R=z;if(z=R(),$l){ur(!0);try{R()}finally{ur(!1)}}}return L.memoizedState=L.baseState=z,L.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Xr,lastRenderedState:z},L}function Df(z,L,R,I){return z.baseState=R,lu(z,Sn,typeof I=="function"?I:Xr)}function $p(z,L,R,I,B){if(Si(z))throw Error(X(485));if(z=L.action,z!==null){var F={payload:B,action:z,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(U){F.listeners.push(U)}};Tt.T===null?F.isTransition=!1:R(!0),I(F),R=L.pending,R===null?(F.next=L.pending=F,Rf(L,F)):(F.next=R.next,L.pending=R.next=F)}}function Rf(z,L){var R=L.action,I=L.payload,B=z.state;if(L.isTransition){var F=Tt.T,U={};Tt.T=U;try{var V=R(B,I),W=Tt.S;W!==null&&W(U,V),Of(z,L,V)}catch(yt){iu(z,L,yt)}finally{F!==null&&U.types!==null&&(F.types=U.types),Tt.T=F}}else try{F=R(B,I),Of(z,L,F)}catch(yt){iu(z,L,yt)}}function Of(z,L,R){typeof R=="object"&&R&&typeof R.then=="function"?R.then(function(I){If(z,L,I)},function(I){return iu(z,L,I)}):If(z,L,R)}function If(z,L,R){L.status="fulfilled",L.value=R,Bf(L),z.state=R,L=z.pending,L!==null&&(R=L.next,R===L?z.pending=null:(R=R.next,L.next=R,Rf(z,R)))}function iu(z,L,R){var I=z.pending;if(z.pending=null,I!==null){I=I.next;do L.status="rejected",L.reason=R,Bf(L),L=L.next;while(L!==I)}z.action=null}function Bf(z){z=z.listeners;for(var L=0;L<z.length;L++)(0,z[L])()}function Ff(z,L){return L}function Uf(z,L){if(pn){var R=En.formState;if(R!==null){e:{var I=an;if(pn){if(Pn){t:{for(var B=Pn,F=mr;B.nodeType!==8;){if(!F){B=null;break t}if(B=yr(B.nextSibling),B===null){B=null;break t}}F=B.data,B=F==="F!"||F==="F"?B:null}if(B){Pn=yr(B.nextSibling),I=B.data==="F!";break e}}nl(I)}I=!1}I&&(L=R[0])}}return R=Wn(),R.memoizedState=R.baseState=L,I={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ff,lastRenderedState:L},R.queue=I,R=ad.bind(null,an,I),I.dispatch=R,I=ou(!1),F=pu.bind(null,an,!1,I.queue),I=Wn(),B={state:L,dispatch:null,action:z,pending:null},I.queue=B,R=$p.bind(null,an,B,F,R),B.dispatch=R,I.memoizedState=z,[L,R,!1]}function Xf(z){return Vf(Mn(),Sn,z)}function Vf(z,L,R){if(L=lu(z,L,Ff)[0],z=bi(Xr)[0],typeof L=="object"&&L&&typeof L.then=="function")try{var I=go(L)}catch(U){throw U===Sa?ui:U}else I=L;L=Mn();var B=L.queue,F=B.dispatch;return R!==L.memoizedState&&(an.flags|=2048,Ta(9,{destroy:void 0},qp.bind(null,B,R),null)),[I,F,z]}function qp(z,L){z.action=L}function Yf(z){var L=Mn(),R=Sn;if(R!==null)return Vf(L,R,z);Mn(),L=L.memoizedState,R=Mn();var I=R.queue.dispatch;return R.memoizedState=z,[L,I,!1]}function Ta(z,L,R,I){return z={tag:z,create:R,deps:I,inst:L,next:null},L=an.updateQueue,L===null&&(L=vi(),an.updateQueue=L),R=L.lastEffect,R===null?L.lastEffect=z.next=z:(I=R.next,R.next=z,z.next=I,L.lastEffect=z),z}function Gf(){return Mn().memoizedState}function wi(z,L,R,I){var B=Wn();an.flags|=z,B.memoizedState=Ta(1|L,{destroy:void 0},R,I===void 0?null:I)}function ki(z,L,R,I){var B=Mn();I=I===void 0?null:I;var F=B.memoizedState.inst;Sn!==null&&I!==null&&Ks(I,Sn.memoizedState.deps)?B.memoizedState=Ta(L,F,R,I):(an.flags|=z,B.memoizedState=Ta(1|L,F,R,I))}function Hf(z,L){wi(8390656,8,z,L)}function su(z,L){ki(2048,8,z,L)}function jp(z){an.flags|=4;var L=an.updateQueue;if(L===null)L=vi(),an.updateQueue=L,L.events=[z];else{var R=L.events;R===null?L.events=[z]:R.push(z)}}function $f(z){var L=Mn().memoizedState;return jp({ref:L,nextImpl:z}),function(){if(gn&2)throw Error(X(440));return L.impl.apply(void 0,arguments)}}function qf(z,L){return ki(4,2,z,L)}function jf(z,L){return ki(4,4,z,L)}function Wf(z,L){if(typeof L=="function"){z=z();var R=L(z);return function(){typeof R=="function"?R():L(null)}}if(L!=null)return z=z(),L.current=z,function(){L.current=null}}function Zf(z,L,R){R=R==null?null:R.concat([z]),ki(4,4,Wf.bind(null,L,z),R)}function uu(){}function Qf(z,L){var R=Mn();L=L===void 0?null:L;var I=R.memoizedState;return L!==null&&Ks(L,I[1])?I[0]:(R.memoizedState=[z,L],z)}function Kf(z,L){var R=Mn();L=L===void 0?null:L;var I=R.memoizedState;if(L!==null&&Ks(L,I[1]))return I[0];if(I=z(),$l){ur(!0);try{z()}finally{ur(!1)}}return R.memoizedState=[I,L],I}function cu(z,L,R){return R===void 0||Ur&1073741824&&!(fn&261930)?z.memoizedState=L:(z.memoizedState=R,z=Zd(),an.lanes|=z,ul|=z,R)}function Jf(z,L,R,I){return rr(R,L)?R:Ca.current===null?!(Ur&42)||Ur&1073741824&&!(fn&261930)?(On=!0,z.memoizedState=R):(z=Zd(),an.lanes|=z,ul|=z,L):(z=cu(z,R,I),rr(z,L)||(On=!0),z)}function ed(z,L,R,I,B){var F=Lt.p;Lt.p=F!==0&&8>F?F:8;var U=Tt.T,V={};Tt.T=V,pu(z,!1,L,R);try{var W=B(),yt=Tt.S;yt!==null&&yt(V,W),typeof W=="object"&&W&&typeof W.then=="function"?mo(z,L,Yp(W,I),vr(z)):mo(z,L,I,vr(z))}catch(Ct){mo(z,L,{then:function(){},status:"rejected",reason:Ct},vr())}finally{Lt.p=F,U!==null&&V.types!==null&&(U.types=V.types),Tt.T=U}}function Wp(){}function fu(z,L,R,I){if(z.tag!==5)throw Error(X(476));var B=td(z).queue;ed(z,B,L,nn,R===null?Wp:function(){return nd(z),R(I)})}function td(z){var L=z.memoizedState;if(L!==null)return L;L={memoizedState:nn,baseState:nn,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Xr,lastRenderedState:nn},next:null};var R={};return L.next={memoizedState:R,baseState:R,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Xr,lastRenderedState:R},next:null},z.memoizedState=L,z=z.alternate,z!==null&&(z.memoizedState=L),L}function nd(z){var L=td(z);L.next===null&&(L=z.alternate.memoizedState),mo(z,L.next.queue,{},vr())}function du(){return Yn(_o)}function rd(){return Mn().memoizedState}function ld(){return Mn().memoizedState}function Zp(z){for(var L=z.return;L!==null;){switch(L.tag){case 24:case 3:var R=vr();z=Gl(R);var I=Hl(L,z,R);I!==null&&(nr(I,L,R),co(I,L,R)),L={cache:Xs()},z.payload=L;return}L=L.return}}function Qp(z,L,R){var I=vr();R={lane:I,revertLane:0,gesture:null,action:R,hasEagerState:!1,eagerState:null,next:null},Si(z)?od(L,R):(R=Ns(z,L,R,I),R!==null&&(nr(R,z,I),id(R,L,I)))}function ad(z,L,R){mo(z,L,R,vr())}function mo(z,L,R,I){var B={lane:I,revertLane:0,gesture:null,action:R,hasEagerState:!1,eagerState:null,next:null};if(Si(z))od(L,B);else{var F=z.alternate;if(z.lanes===0&&(F===null||F.lanes===0)&&(F=L.lastRenderedReducer,F!==null))try{var U=L.lastRenderedState,V=F(U,R);if(B.hasEagerState=!0,B.eagerState=V,rr(V,U))return ni(z,L,B,0),En===null&&ti(),!1}catch{}if(R=Ns(z,L,B,I),R!==null)return nr(R,z,I),id(R,L,I),!0}return!1}function pu(z,L,R,I){if(I={lane:2,revertLane:Hu(),gesture:null,action:I,hasEagerState:!1,eagerState:null,next:null},Si(z)){if(L)throw Error(X(479))}else L=Ns(z,R,I,2),L!==null&&nr(L,z,2)}function Si(z){var L=z.alternate;return z===an||L!==null&&L===an}function od(z,L){Ea=gi=!0;var R=z.pending;R===null?L.next=L:(L.next=R.next,R.next=L),z.pending=L}function id(z,L,R){if(R&4194048){var I=L.lanes;I&=z.pendingLanes,R|=I,L.lanes=R,Al(z,R)}}var vo={readContext:Yn,use:yi,useCallback:An,useContext:An,useEffect:An,useImperativeHandle:An,useLayoutEffect:An,useInsertionEffect:An,useMemo:An,useReducer:An,useRef:An,useState:An,useDebugValue:An,useDeferredValue:An,useTransition:An,useSyncExternalStore:An,useId:An,useHostTransitionStatus:An,useFormState:An,useActionState:An,useOptimistic:An,useMemoCache:An,useCacheRefresh:An};vo.useEffectEvent=An;var sd={readContext:Yn,use:yi,useCallback:function(z,L){return Wn().memoizedState=[z,L===void 0?null:L],z},useContext:Yn,useEffect:Hf,useImperativeHandle:function(z,L,R){R=R==null?null:R.concat([z]),wi(4194308,4,Wf.bind(null,L,z),R)},useLayoutEffect:function(z,L){return wi(4194308,4,z,L)},useInsertionEffect:function(z,L){wi(4,2,z,L)},useMemo:function(z,L){var R=Wn();L=L===void 0?null:L;var I=z();if($l){ur(!0);try{z()}finally{ur(!1)}}return R.memoizedState=[I,L],I},useReducer:function(z,L,R){var I=Wn();if(R!==void 0){var B=R(L);if($l){ur(!0);try{R(L)}finally{ur(!1)}}}else B=L;return I.memoizedState=I.baseState=B,z={pending:null,lanes:0,dispatch:null,lastRenderedReducer:z,lastRenderedState:B},I.queue=z,z=z.dispatch=Qp.bind(null,an,z),[I.memoizedState,z]},useRef:function(z){var L=Wn();return z={current:z},L.memoizedState=z},useState:function(z){z=ou(z);var L=z.queue,R=ad.bind(null,an,L);return L.dispatch=R,[z.memoizedState,R]},useDebugValue:uu,useDeferredValue:function(z,L){return cu(Wn(),z,L)},useTransition:function(){var z=ou(!1);return z=ed.bind(null,an,z.queue,!0,!1),Wn().memoizedState=z,[!1,z]},useSyncExternalStore:function(z,L,R){var I=an,B=Wn();if(pn){if(R===void 0)throw Error(X(407));R=R()}else{if(R=L(),En===null)throw Error(X(349));fn&127||Af(I,L,R)}B.memoizedState=R;var F={value:R,getSnapshot:L};return B.queue=F,Hf(Lf.bind(null,I,F,z),[z]),I.flags|=2048,Ta(9,{destroy:void 0},Nf.bind(null,I,F,R,L),null),R},useId:function(){var z=Wn(),L=En.identifierPrefix;if(pn){var R=zr,I=Tr;R=(I&~(1<<32-Xn(I)-1)).toString(32)+R,L="_"+L+"R_"+R,R=mi++,0<R&&(L+="H"+R.toString(32)),L+="_"}else R=Gp++,L="_"+L+"r_"+R.toString(32)+"_";return z.memoizedState=L},useHostTransitionStatus:du,useFormState:Uf,useActionState:Uf,useOptimistic:function(z){var L=Wn();L.memoizedState=L.baseState=z;var R={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return L.queue=R,L=pu.bind(null,an,!0,R),R.dispatch=L,[z,L]},useMemoCache:ru,useCacheRefresh:function(){return Wn().memoizedState=Zp.bind(null,an)},useEffectEvent:function(z){var L=Wn(),R={impl:z};return L.memoizedState=R,function(){if(gn&2)throw Error(X(440));return R.impl.apply(void 0,arguments)}}},hu={readContext:Yn,use:yi,useCallback:Qf,useContext:Yn,useEffect:su,useImperativeHandle:Zf,useInsertionEffect:qf,useLayoutEffect:jf,useMemo:Kf,useReducer:bi,useRef:Gf,useState:function(){return bi(Xr)},useDebugValue:uu,useDeferredValue:function(z,L){return Jf(Mn(),Sn.memoizedState,z,L)},useTransition:function(){var z=bi(Xr)[0],L=Mn().memoizedState;return[typeof z=="boolean"?z:go(z),L]},useSyncExternalStore:zf,useId:rd,useHostTransitionStatus:du,useFormState:Xf,useActionState:Xf,useOptimistic:function(z,L){return Df(Mn(),Sn,z,L)},useMemoCache:ru,useCacheRefresh:ld};hu.useEffectEvent=$f;var ud={readContext:Yn,use:yi,useCallback:Qf,useContext:Yn,useEffect:su,useImperativeHandle:Zf,useInsertionEffect:qf,useLayoutEffect:jf,useMemo:Kf,useReducer:au,useRef:Gf,useState:function(){return au(Xr)},useDebugValue:uu,useDeferredValue:function(z,L){var R=Mn();return Sn===null?cu(R,z,L):Jf(R,Sn.memoizedState,z,L)},useTransition:function(){var z=au(Xr)[0],L=Mn().memoizedState;return[typeof z=="boolean"?z:go(z),L]},useSyncExternalStore:zf,useId:rd,useHostTransitionStatus:du,useFormState:Yf,useActionState:Yf,useOptimistic:function(z,L){var R=Mn();return Sn===null?(R.baseState=z,[z,R.queue.dispatch]):Df(R,Sn,z,L)},useMemoCache:ru,useCacheRefresh:ld};ud.useEffectEvent=$f;function gu(z,L,R,I){L=z.memoizedState,R=R(I,L),R=R==null?L:mt({},L,R),z.memoizedState=R,z.lanes===0&&(z.updateQueue.baseState=R)}var mu={enqueueSetState:function(z,L,R){z=z._reactInternals;var I=vr(),B=Gl(I);B.payload=L,R!=null&&(B.callback=R),L=Hl(z,B,I),L!==null&&(nr(L,z,I),co(L,z,I))},enqueueReplaceState:function(z,L,R){z=z._reactInternals;var I=vr(),B=Gl(I);B.tag=1,B.payload=L,R!=null&&(B.callback=R),L=Hl(z,B,I),L!==null&&(nr(L,z,I),co(L,z,I))},enqueueForceUpdate:function(z,L){z=z._reactInternals;var R=vr(),I=Gl(R);I.tag=2,L!=null&&(I.callback=L),L=Hl(z,I,R),L!==null&&(nr(L,z,R),co(L,z,R))}};function cd(z,L,R,I,B,F,U){return z=z.stateNode,typeof z.shouldComponentUpdate=="function"?z.shouldComponentUpdate(I,F,U):L.prototype&&L.prototype.isPureReactComponent?!no(R,I)||!no(B,F):!0}function fd(z,L,R,I){z=L.state,typeof L.componentWillReceiveProps=="function"&&L.componentWillReceiveProps(R,I),typeof L.UNSAFE_componentWillReceiveProps=="function"&&L.UNSAFE_componentWillReceiveProps(R,I),L.state!==z&&mu.enqueueReplaceState(L,L.state,null)}function ql(z,L){var R=L;if("ref"in L)for(var I in R={},L)I!=="ref"&&(R[I]=L[I]);if(z=z.defaultProps)for(var B in R===L&&(R=mt({},R)),z)R[B]===void 0&&(R[B]=z[B]);return R}function Kp(z){ei(z)}function Jp(z){console.error(z)}function eh(z){ei(z)}function xi(z,L){try{var R=z.onUncaughtError;R(L.value,{componentStack:L.stack})}catch(I){setTimeout(function(){throw I})}}function dd(z,L,R){try{var I=z.onCaughtError;I(R.value,{componentStack:R.stack,errorBoundary:L.tag===1?L.stateNode:null})}catch(B){setTimeout(function(){throw B})}}function vu(z,L,R){return R=Gl(R),R.tag=3,R.payload={element:null},R.callback=function(){xi(z,L)},R}function pd(z){return z=Gl(z),z.tag=3,z}function hd(z,L,R,I){var B=R.type.getDerivedStateFromError;if(typeof B=="function"){var F=I.value;z.payload=function(){return B(F)},z.callback=function(){dd(L,R,I)}}var U=R.stateNode;U!==null&&typeof U.componentDidCatch=="function"&&(z.callback=function(){dd(L,R,I),typeof B!="function"&&(cl===null?cl=new Set([this]):cl.add(this));var V=I.stack;this.componentDidCatch(I.value,{componentStack:V===null?"":V})})}function th(z,L,R,I,B){if(R.flags|=32768,typeof I=="object"&&I&&typeof I.then=="function"){if(L=R.alternate,L!==null&&ba(L,R,B,!0),R=ar.current,R!==null){switch(R.tag){case 31:case 13:return xr===null?Ri():R.alternate===null&&Nn===0&&(Nn=3),R.flags&=-257,R.flags|=65536,R.lanes=B,I===ci?R.flags|=16384:(L=R.updateQueue,L===null?R.updateQueue=new Set([I]):L.add(I),Vu(z,I,B)),!1;case 22:return R.flags|=65536,I===ci?R.flags|=16384:(L=R.updateQueue,L===null?(L={transitions:null,markerInstances:null,retryQueue:new Set([I])},R.updateQueue=L):(R=L.retryQueue,R===null?L.retryQueue=new Set([I]):R.add(I)),Vu(z,I,B)),!1}throw Error(X(435,R.tag))}return Vu(z,I,B),Ri(),!1}if(pn)return L=ar.current,L===null?(I!==Os&&(L=Error(X(423),{cause:I}),ao(pr(L,R))),z=z.current.alternate,z.flags|=65536,B&=-B,z.lanes|=B,I=pr(I,R),B=vu(z.stateNode,I,B),qs(z,B),Nn!==4&&(Nn=2)):(!(L.flags&65536)&&(L.flags|=256),L.flags|=65536,L.lanes=B,I!==Os&&(z=Error(X(422),{cause:I}),ao(pr(z,R)))),!1;var F=Error(X(520),{cause:I});if(F=pr(F,R),Eo===null?Eo=[F]:Eo.push(F),Nn!==4&&(Nn=2),L===null)return!0;I=pr(I,R),R=L;do{switch(R.tag){case 3:return R.flags|=65536,z=B&-B,R.lanes|=z,z=vu(R.stateNode,I,z),qs(R,z),!1;case 1:if(L=R.type,F=R.stateNode,!(R.flags&128)&&(typeof L.getDerivedStateFromError=="function"||F!==null&&typeof F.componentDidCatch=="function"&&(cl===null||!cl.has(F))))return R.flags|=65536,B&=-B,R.lanes|=B,B=pd(B),hd(B,z,R,I),qs(R,B),!1}R=R.return}while(R!==null);return!1}var yu=Error(X(461)),On=!1;function Gn(z,L,R,I){L.child=z===null?kf(L,null,R,I):Yl(L,z.child,R,I)}function gd(z,L,R,I,B){R=R.render;var F=L.ref;if("ref"in I){var U={};for(var V in I)V!=="ref"&&(U[V]=I[V])}else U=I;return Fl(L),I=Js(z,L,R,U,F,B),V=eu(),z!==null&&!On?(tu(z,L,B),Vr(z,L,B)):(pn&&V&&Ds(L),L.flags|=1,Gn(z,L,I,B),L.child)}function md(z,L,R,I,B){if(z===null){var F=R.type;return typeof F=="function"&&!Ls(F)&&F.defaultProps===void 0&&R.compare===null?(L.tag=15,L.type=F,vd(z,L,F,I,B)):(z=li(R.type,null,I,L,L.mode,B),z.ref=L.ref,z.return=L,L.child=z)}if(F=z.child,!Pu(z,B)){var U=F.memoizedProps;if(R=R.compare,R=R===null?no:R,R(U,I)&&z.ref===L.ref)return Vr(z,L,B)}return L.flags|=1,z=Or(F,I),z.ref=L.ref,z.return=L,L.child=z}function vd(z,L,R,I,B){if(z!==null){var F=z.memoizedProps;if(no(F,I)&&z.ref===L.ref)if(On=!1,L.pendingProps=I=F,Pu(z,B))z.flags&131072&&(On=!0);else return L.lanes=z.lanes,Vr(z,L,B)}return bu(z,L,R,I,B)}function yd(z,L,R,I){var B=I.children,F=z===null?null:z.memoizedState;if(z===null&&L.stateNode===null&&(L.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),I.mode==="hidden"){if(L.flags&128){if(F=F===null?R:F.baseLanes|R,z!==null){for(I=L.child=z.child,B=0;I!==null;)B=B|I.lanes|I.childLanes,I=I.sibling;I=B&~F}else I=0,L.child=null;return bd(z,L,F,R,I)}if(R&536870912)L.memoizedState={baseLanes:0,cachePool:null},z!==null&&si(L,F===null?null:F.cachePool),F===null?Ws():Cf(L,F),Ef(L);else return I=L.lanes=536870912,bd(z,L,F===null?R:F.baseLanes|R,R,I)}else F===null?(z!==null&&si(L,null),Ws(),ol(L)):(si(L,F.cachePool),Cf(L,F),ol(L),L.memoizedState=null);return Gn(z,L,B,R),L.child}function yo(z,L){return z!==null&&z.tag===22||L.stateNode!==null||(L.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),L.sibling}function bd(z,L,R,I,B){var F=Ys();return F=F===null?null:{parent:Dn._currentValue,pool:F},L.memoizedState={baseLanes:R,cachePool:F},z!==null&&si(L,null),Ws(),Ef(L),z!==null&&ba(z,L,I,!0),L.childLanes=B,null}function Ci(z,L){return L=Pi({mode:L.mode,children:L.children},z.mode),L.ref=z.ref,z.child=L,L.return=z,L}function wd(z,L,R){return Yl(L,z.child,null,R),z=Ci(L,L.pendingProps),z.flags|=2,or(L),L.memoizedState=null,z}function nh(z,L,R){var I=L.pendingProps,B=(L.flags&128)!=0;if(L.flags&=-129,z===null){if(pn){if(I.mode==="hidden")return z=Ci(L,I),L.lanes=536870912,yo(null,z);if(Qs(L),(z=Pn)?(z=_0(z,mr),z=z!==null&&z.data==="&"?z:null,z!==null&&(L.memoizedState={dehydrated:z,treeContext:el===null?null:{id:Tr,overflow:zr},retryLane:536870912,hydrationErrors:null},R=af(z),R.return=L,L.child=R,Vn=L,Pn=null)):z=null,z===null)throw nl(L);return L.lanes=536870912,null}return Ci(L,I)}var F=z.memoizedState;if(F!==null){var U=F.dehydrated;if(Qs(L),B)if(L.flags&256)L.flags&=-257,L=wd(z,L,R);else if(L.memoizedState!==null)L.child=z.child,L.flags|=128,L=null;else throw Error(X(558));else if(On||ba(z,L,R,!1),B=(R&z.childLanes)!==0,On||B){if(I=En,I!==null&&(U=Xo(I,R),U!==0&&U!==F.retryLane))throw F.retryLane=U,Rl(z,U),nr(I,z,U),yu;Ri(),L=wd(z,L,R)}else z=F.treeContext,Pn=yr(U.nextSibling),Vn=L,pn=!0,tl=null,mr=!1,z!==null&&uf(L,z),L=Ci(L,I),L.flags|=4096;return L}return z=Or(z.child,{mode:I.mode,children:I.children}),z.ref=L.ref,L.child=z,z.return=L,z}function Ei(z,L){var R=L.ref;if(R===null)z!==null&&z.ref!==null&&(L.flags|=4194816);else{if(typeof R!="function"&&typeof R!="object")throw Error(X(284));(z===null||z.ref!==R)&&(L.flags|=4194816)}}function bu(z,L,R,I,B){return Fl(L),R=Js(z,L,R,I,void 0,B),I=eu(),z!==null&&!On?(tu(z,L,B),Vr(z,L,B)):(pn&&I&&Ds(L),L.flags|=1,Gn(z,L,R,B),L.child)}function kd(z,L,R,I,B,F){return Fl(L),L.updateQueue=null,R=Tf(L,I,R,B),Pf(z),I=eu(),z!==null&&!On?(tu(z,L,F),Vr(z,L,F)):(pn&&I&&Ds(L),L.flags|=1,Gn(z,L,R,F),L.child)}function Sd(z,L,R,I,B){if(Fl(L),L.stateNode===null){var F=ga,U=R.contextType;typeof U=="object"&&U&&(F=Yn(U)),F=new R(I,F),L.memoizedState=F.state!==null&&F.state!==void 0?F.state:null,F.updater=mu,L.stateNode=F,F._reactInternals=L,F=L.stateNode,F.props=I,F.state=L.memoizedState,F.refs={},Hs(L),U=R.contextType,F.context=typeof U=="object"&&U?Yn(U):ga,F.state=L.memoizedState,U=R.getDerivedStateFromProps,typeof U=="function"&&(gu(L,R,U,I),F.state=L.memoizedState),typeof R.getDerivedStateFromProps=="function"||typeof F.getSnapshotBeforeUpdate=="function"||typeof F.UNSAFE_componentWillMount!="function"&&typeof F.componentWillMount!="function"||(U=F.state,typeof F.componentWillMount=="function"&&F.componentWillMount(),typeof F.UNSAFE_componentWillMount=="function"&&F.UNSAFE_componentWillMount(),U!==F.state&&mu.enqueueReplaceState(F,F.state,null),po(L,I,F,B),fo(),F.state=L.memoizedState),typeof F.componentDidMount=="function"&&(L.flags|=4194308),I=!0}else if(z===null){F=L.stateNode;var V=L.memoizedProps,W=ql(R,V);F.props=W;var yt=F.context,Ct=R.contextType;U=ga,typeof Ct=="object"&&Ct&&(U=Yn(Ct));var zt=R.getDerivedStateFromProps;Ct=typeof zt=="function"||typeof F.getSnapshotBeforeUpdate=="function",V=L.pendingProps!==V,Ct||typeof F.UNSAFE_componentWillReceiveProps!="function"&&typeof F.componentWillReceiveProps!="function"||(V||yt!==U)&&fd(L,F,I,U),ll=!1;var bt=L.memoizedState;F.state=bt,po(L,I,F,B),fo(),yt=L.memoizedState,V||bt!==yt||ll?(typeof zt=="function"&&(gu(L,R,zt,I),yt=L.memoizedState),(W=ll||cd(L,R,W,I,bt,yt,U))?(Ct||typeof F.UNSAFE_componentWillMount!="function"&&typeof F.componentWillMount!="function"||(typeof F.componentWillMount=="function"&&F.componentWillMount(),typeof F.UNSAFE_componentWillMount=="function"&&F.UNSAFE_componentWillMount()),typeof F.componentDidMount=="function"&&(L.flags|=4194308)):(typeof F.componentDidMount=="function"&&(L.flags|=4194308),L.memoizedProps=I,L.memoizedState=yt),F.props=I,F.state=yt,F.context=U,I=W):(typeof F.componentDidMount=="function"&&(L.flags|=4194308),I=!1)}else{F=L.stateNode,$s(z,L),U=L.memoizedProps,Ct=ql(R,U),F.props=Ct,zt=L.pendingProps,bt=F.context,yt=R.contextType,W=ga,typeof yt=="object"&&yt&&(W=Yn(yt)),V=R.getDerivedStateFromProps,(yt=typeof V=="function"||typeof F.getSnapshotBeforeUpdate=="function")||typeof F.UNSAFE_componentWillReceiveProps!="function"&&typeof F.componentWillReceiveProps!="function"||(U!==zt||bt!==W)&&fd(L,F,I,W),ll=!1,bt=L.memoizedState,F.state=bt,po(L,I,F,B),fo();var wt=L.memoizedState;U!==zt||bt!==wt||ll||z!==null&&z.dependencies!==null&&oi(z.dependencies)?(typeof V=="function"&&(gu(L,R,V,I),wt=L.memoizedState),(Ct=ll||cd(L,R,Ct,I,bt,wt,W)||z!==null&&z.dependencies!==null&&oi(z.dependencies))?(yt||typeof F.UNSAFE_componentWillUpdate!="function"&&typeof F.componentWillUpdate!="function"||(typeof F.componentWillUpdate=="function"&&F.componentWillUpdate(I,wt,W),typeof F.UNSAFE_componentWillUpdate=="function"&&F.UNSAFE_componentWillUpdate(I,wt,W)),typeof F.componentDidUpdate=="function"&&(L.flags|=4),typeof F.getSnapshotBeforeUpdate=="function"&&(L.flags|=1024)):(typeof F.componentDidUpdate!="function"||U===z.memoizedProps&&bt===z.memoizedState||(L.flags|=4),typeof F.getSnapshotBeforeUpdate!="function"||U===z.memoizedProps&&bt===z.memoizedState||(L.flags|=1024),L.memoizedProps=I,L.memoizedState=wt),F.props=I,F.state=wt,F.context=W,I=Ct):(typeof F.componentDidUpdate!="function"||U===z.memoizedProps&&bt===z.memoizedState||(L.flags|=4),typeof F.getSnapshotBeforeUpdate!="function"||U===z.memoizedProps&&bt===z.memoizedState||(L.flags|=1024),I=!1)}return F=I,Ei(z,L),I=(L.flags&128)!=0,F||I?(F=L.stateNode,R=I&&typeof R.getDerivedStateFromError!="function"?null:F.render(),L.flags|=1,z!==null&&I?(L.child=Yl(L,z.child,null,B),L.child=Yl(L,null,R,B)):Gn(z,L,R,B),L.memoizedState=F.state,z=L.child):z=Vr(z,L,B),z}function xd(z,L,R,I){return Il(),L.flags|=256,Gn(z,L,R,I),L.child}var wu={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function ku(z){return{baseLanes:z,cachePool:gf()}}function Su(z,L,R){return z=z===null?0:z.childLanes&~R,L&&(z|=sr),z}function Cd(z,L,R){var I=L.pendingProps,B=!1,F=(L.flags&128)!=0,U;if((U=F)||(U=z!==null&&z.memoizedState===null?!1:(Ln.current&2)!=0),U&&(B=!0,L.flags&=-129),U=(L.flags&32)!=0,L.flags&=-33,z===null){if(pn){if(B?al(L):ol(L),(z=Pn)?(z=_0(z,mr),z=z!==null&&z.data!=="&"?z:null,z!==null&&(L.memoizedState={dehydrated:z,treeContext:el===null?null:{id:Tr,overflow:zr},retryLane:536870912,hydrationErrors:null},R=af(z),R.return=L,L.child=R,Vn=L,Pn=null)):z=null,z===null)throw nl(L);return rc(z)?L.lanes=32:L.lanes=536870912,null}var V=I.children;return I=I.fallback,B?(ol(L),B=L.mode,V=Pi({mode:"hidden",children:V},B),I=Ol(I,B,R,null),V.return=L,I.return=L,V.sibling=I,L.child=V,I=L.child,I.memoizedState=ku(R),I.childLanes=Su(z,U,R),L.memoizedState=wu,yo(null,I)):(al(L),xu(L,V))}var W=z.memoizedState;if(W!==null&&(V=W.dehydrated,V!==null)){if(F)L.flags&256?(al(L),L.flags&=-257,L=Cu(z,L,R)):L.memoizedState===null?(ol(L),V=I.fallback,B=L.mode,I=Pi({mode:"visible",children:I.children},B),V=Ol(V,B,R,null),V.flags|=2,I.return=L,V.return=L,I.sibling=V,L.child=I,Yl(L,z.child,null,R),I=L.child,I.memoizedState=ku(R),I.childLanes=Su(z,U,R),L.memoizedState=wu,L=yo(null,I)):(ol(L),L.child=z.child,L.flags|=128,L=null);else if(al(L),rc(V)){if(U=V.nextSibling&&V.nextSibling.dataset,U)var yt=U.dgst;U=yt,I=Error(X(419)),I.stack="",I.digest=U,ao({value:I,source:null,stack:null}),L=Cu(z,L,R)}else if(On||ba(z,L,R,!1),U=(R&z.childLanes)!==0,On||U){if(U=En,U!==null&&(I=Xo(U,R),I!==0&&I!==W.retryLane))throw W.retryLane=I,Rl(z,I),nr(U,z,I),yu;nc(V)||Ri(),L=Cu(z,L,R)}else nc(V)?(L.flags|=192,L.child=z.child,L=null):(z=W.treeContext,Pn=yr(V.nextSibling),Vn=L,pn=!0,tl=null,mr=!1,z!==null&&uf(L,z),L=xu(L,I.children),L.flags|=4096);return L}return B?(ol(L),V=I.fallback,B=L.mode,W=z.child,yt=W.sibling,I=Or(W,{mode:"hidden",children:I.children}),I.subtreeFlags=W.subtreeFlags&65011712,yt===null?(V=Ol(V,B,R,null),V.flags|=2):V=Or(yt,V),V.return=L,I.return=L,I.sibling=V,L.child=I,yo(null,I),I=L.child,V=z.child.memoizedState,V===null?V=ku(R):(B=V.cachePool,B===null?B=gf():(W=Dn._currentValue,B=B.parent===W?B:{parent:W,pool:W}),V={baseLanes:V.baseLanes|R,cachePool:B}),I.memoizedState=V,I.childLanes=Su(z,U,R),L.memoizedState=wu,yo(z.child,I)):(al(L),R=z.child,z=R.sibling,R=Or(R,{mode:"visible",children:I.children}),R.return=L,R.sibling=null,z!==null&&(U=L.deletions,U===null?(L.deletions=[z],L.flags|=16):U.push(z)),L.child=R,L.memoizedState=null,R)}function xu(z,L){return L=Pi({mode:"visible",children:L},z.mode),L.return=z,z.child=L}function Pi(z,L){return z=lr(22,z,null,L),z.lanes=0,z}function Cu(z,L,R){return Yl(L,z.child,null,R),z=xu(L,L.pendingProps.children),z.flags|=2,L.memoizedState=null,z}function Ed(z,L,R){z.lanes|=L;var I=z.alternate;I!==null&&(I.lanes|=L),Fs(z.return,L,R)}function Eu(z,L,R,I,B,F){var U=z.memoizedState;U===null?z.memoizedState={isBackwards:L,rendering:null,renderingStartTime:0,last:I,tail:R,tailMode:B,treeForkCount:F}:(U.isBackwards=L,U.rendering=null,U.renderingStartTime=0,U.last=I,U.tail=R,U.tailMode=B,U.treeForkCount=F)}function Pd(z,L,R){var I=L.pendingProps,B=I.revealOrder,F=I.tail;I=I.children;var U=Ln.current,V=(U&2)!=0;if(V?(U=U&1|2,L.flags|=128):U&=1,Mt(Ln,U),Gn(z,L,I,R),I=pn?lo:0,!V&&z!==null&&z.flags&128)e:for(z=L.child;z!==null;){if(z.tag===13)z.memoizedState!==null&&Ed(z,R,L);else if(z.tag===19)Ed(z,R,L);else if(z.child!==null){z.child.return=z,z=z.child;continue}if(z===L)break e;for(;z.sibling===null;){if(z.return===null||z.return===L)break e;z=z.return}z.sibling.return=z.return,z=z.sibling}switch(B){case"forwards":for(R=L.child,B=null;R!==null;)z=R.alternate,z!==null&&hi(z)===null&&(B=R),R=R.sibling;R=B,R===null?(B=L.child,L.child=null):(B=R.sibling,R.sibling=null),Eu(L,!1,B,R,F,I);break;case"backwards":case"unstable_legacy-backwards":for(R=null,B=L.child,L.child=null;B!==null;){if(z=B.alternate,z!==null&&hi(z)===null){L.child=B;break}z=B.sibling,B.sibling=R,R=B,B=z}Eu(L,!0,R,null,F,I);break;case"together":Eu(L,!1,null,null,void 0,I);break;default:L.memoizedState=null}return L.child}function Vr(z,L,R){if(z!==null&&(L.dependencies=z.dependencies),ul|=L.lanes,(R&L.childLanes)===0)if(z!==null){if(ba(z,L,R,!1),(R&L.childLanes)===0)return null}else return null;if(z!==null&&L.child!==z.child)throw Error(X(153));if(L.child!==null){for(z=L.child,R=Or(z,z.pendingProps),L.child=R,R.return=L;z.sibling!==null;)z=z.sibling,R=R.sibling=Or(z,z.pendingProps),R.return=L;R.sibling=null}return L.child}function Pu(z,L){return z.lanes&L?!0:(z=z.dependencies,!!(z!==null&&oi(z)))}function rh(z,L,R){switch(L.tag){case 3:vn(L,L.stateNode.containerInfo),rl(L,Dn,z.memoizedState.cache),Il();break;case 27:case 5:Nr(L);break;case 4:vn(L,L.stateNode.containerInfo);break;case 10:rl(L,L.type,L.memoizedProps.value);break;case 31:if(L.memoizedState!==null)return L.flags|=128,Qs(L),null;break;case 13:var I=L.memoizedState;if(I!==null)return I.dehydrated===null?R&L.child.childLanes?Cd(z,L,R):(al(L),z=Vr(z,L,R),z===null?null:z.sibling):(al(L),L.flags|=128,null);al(L);break;case 19:var B=(z.flags&128)!=0;if(I=(R&L.childLanes)!==0,I||(I=(ba(z,L,R,!1),(R&L.childLanes)!==0)),B){if(I)return Pd(z,L,R);L.flags|=128}if(B=L.memoizedState,B!==null&&(B.rendering=null,B.tail=null,B.lastEffect=null),Mt(Ln,Ln.current),I)break;return null;case 22:return L.lanes=0,yd(z,L,R,L.pendingProps);case 24:rl(L,Dn,z.memoizedState.cache)}return Vr(z,L,R)}function Td(z,L,R){if(z!==null)if(z.memoizedProps!==L.pendingProps)On=!0;else{if(!Pu(z,R)&&!(L.flags&128))return On=!1,rh(z,L,R);On=!!(z.flags&131072)}else On=!1,pn&&L.flags&1048576&&sf(L,lo,L.index);switch(L.lanes=0,L.tag){case 16:e:{var I=L.pendingProps;if(z=Xl(L.elementType),L.type=z,typeof z=="function")Ls(z)?(I=ql(z,I),L.tag=1,L=Sd(null,L,z,I,R)):(L.tag=0,L=bu(null,L,z,I,R));else{if(z!=null){var B=z.$$typeof;if(B===Kt){L.tag=11,L=gd(null,L,z,I,R);break e}else if(B===_t){L.tag=14,L=md(null,L,z,I,R);break e}}throw L=Qt(z)||z,Error(X(306,L,""))}}return L;case 0:return bu(z,L,L.type,L.pendingProps,R);case 1:return I=L.type,B=ql(I,L.pendingProps),Sd(z,L,I,B,R);case 3:e:{if(vn(L,L.stateNode.containerInfo),z===null)throw Error(X(387));I=L.pendingProps;var F=L.memoizedState;B=F.element,$s(z,L),po(L,I,null,R);var U=L.memoizedState;if(I=U.cache,rl(L,Dn,I),I!==F.cache&&Us(L,[Dn],R,!0),fo(),I=U.element,F.isDehydrated)if(F={element:I,isDehydrated:!1,cache:U.cache},L.updateQueue.baseState=F,L.memoizedState=F,L.flags&256){L=xd(z,L,I,R);break e}else if(I!==B){B=pr(Error(X(424)),L),ao(B),L=xd(z,L,I,R);break e}else{switch(z=L.stateNode.containerInfo,z.nodeType){case 9:z=z.body;break;default:z=z.nodeName==="HTML"?z.ownerDocument.body:z}for(Pn=yr(z.firstChild),Vn=L,pn=!0,tl=null,mr=!0,R=kf(L,null,I,R),L.child=R;R;)R.flags=R.flags&-3|4096,R=R.sibling}else{if(Il(),I===B){L=Vr(z,L,R);break e}Gn(z,L,I,R)}L=L.child}return L;case 26:return Ei(z,L),z===null?(R=F0(L.type,null,L.pendingProps,null))?L.memoizedState=R:pn||(R=L.type,z=L.pendingProps,I=Vi(Wt.current).createElement(R),I[_n]=L,I[qn]=z,Hn(I,R,z),Fn(I),L.stateNode=I):L.memoizedState=F0(L.type,z.memoizedProps,L.pendingProps,z.memoizedState),null;case 27:return Nr(L),z===null&&pn&&(I=L.stateNode=O0(L.type,L.pendingProps,Wt.current),Vn=L,mr=!0,B=Pn,hl(L.type)?(lc=B,Pn=yr(I.firstChild)):Pn=B),Gn(z,L,L.pendingProps.children,R),Ei(z,L),z===null&&(L.flags|=4194304),L.child;case 5:return z===null&&pn&&((B=I=Pn)&&(I=Lh(I,L.type,L.pendingProps,mr),I===null?B=!1:(L.stateNode=I,Vn=L,Pn=yr(I.firstChild),mr=!1,B=!0)),B||nl(L)),Nr(L),B=L.type,F=L.pendingProps,U=z===null?null:z.memoizedProps,I=F.children,Ju(B,F)?I=null:U!==null&&Ju(B,U)&&(L.flags|=32),L.memoizedState!==null&&(B=Js(z,L,Hp,null,null,R),_o._currentValue=B),Ei(z,L),Gn(z,L,I,R),L.child;case 6:return z===null&&pn&&((z=R=Pn)&&(R=Mh(R,L.pendingProps,mr),R===null?z=!1:(L.stateNode=R,Vn=L,Pn=null,z=!0)),z||nl(L)),null;case 13:return Cd(z,L,R);case 4:return vn(L,L.stateNode.containerInfo),I=L.pendingProps,z===null?L.child=Yl(L,null,I,R):Gn(z,L,I,R),L.child;case 11:return gd(z,L,L.type,L.pendingProps,R);case 7:return Gn(z,L,L.pendingProps,R),L.child;case 8:return Gn(z,L,L.pendingProps.children,R),L.child;case 12:return Gn(z,L,L.pendingProps.children,R),L.child;case 10:return I=L.pendingProps,rl(L,L.type,I.value),Gn(z,L,I.children,R),L.child;case 9:return B=L.type._context,I=L.pendingProps.children,Fl(L),B=Yn(B),I=I(B),L.flags|=1,Gn(z,L,I,R),L.child;case 14:return md(z,L,L.type,L.pendingProps,R);case 15:return vd(z,L,L.type,L.pendingProps,R);case 19:return Pd(z,L,R);case 31:return nh(z,L,R);case 22:return yd(z,L,R,L.pendingProps);case 24:return Fl(L),I=Yn(Dn),z===null?(B=Ys(),B===null&&(B=En,F=Xs(),B.pooledCache=F,F.refCount++,F!==null&&(B.pooledCacheLanes|=R),B=F),L.memoizedState={parent:I,cache:B},Hs(L),rl(L,Dn,B)):(z.lanes&R&&($s(z,L),po(L,null,null,R),fo()),B=z.memoizedState,F=L.memoizedState,B.parent===I?(I=F.cache,rl(L,Dn,I),I!==B.cache&&Us(L,[Dn],R,!0)):(B={parent:I,cache:I},L.memoizedState=B,L.lanes===0&&(L.memoizedState=L.updateQueue.baseState=B),rl(L,Dn,I))),Gn(z,L,L.pendingProps.children,R),L.child;case 29:throw L.pendingProps}throw Error(X(156,L.tag))}function Yr(z){z.flags|=4}function Tu(z,L,R,I,B){if((L=(z.mode&32)!=0)&&(L=!1),L){if(z.flags|=16777216,(B&335544128)===B)if(z.stateNode.complete)z.flags|=8192;else if(e0())z.flags|=8192;else throw Vl=ci,Gs}else z.flags&=-16777217}function zd(z,L){if(L.type!=="stylesheet"||L.state.loading&4)z.flags&=-16777217;else if(z.flags|=16777216,!G0(L))if(e0())z.flags|=8192;else throw Vl=ci,Gs}function Ti(z,L){L!==null&&(z.flags|=4),z.flags&16384&&(L=z.tag===22?536870912:El(),z.lanes|=L,La|=L)}function bo(z,L){if(!pn)switch(z.tailMode){case"hidden":L=z.tail;for(var R=null;L!==null;)L.alternate!==null&&(R=L),L=L.sibling;R===null?z.tail=null:R.sibling=null;break;case"collapsed":R=z.tail;for(var I=null;R!==null;)R.alternate!==null&&(I=R),R=R.sibling;I===null?L||z.tail===null?z.tail=null:z.tail.sibling=null:I.sibling=null}}function Tn(z){var L=z.alternate!==null&&z.alternate.child===z.child,R=0,I=0;if(L)for(var B=z.child;B!==null;)R|=B.lanes|B.childLanes,I|=B.subtreeFlags&65011712,I|=B.flags&65011712,B.return=z,B=B.sibling;else for(B=z.child;B!==null;)R|=B.lanes|B.childLanes,I|=B.subtreeFlags,I|=B.flags,B.return=z,B=B.sibling;return z.subtreeFlags|=I,z.childLanes=R,L}function lh(z,L,R){var I=L.pendingProps;switch(Rs(L),L.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Tn(L),null;case 1:return Tn(L),null;case 3:return R=L.stateNode,I=null,z!==null&&(I=z.memoizedState.cache),L.memoizedState.cache!==I&&(L.flags|=2048),Fr(Dn),yn(),R.pendingContext&&(R.context=R.pendingContext,R.pendingContext=null),(z===null||z.child===null)&&(ya(L)?Yr(L):z===null||z.memoizedState.isDehydrated&&!(L.flags&256)||(L.flags|=1024,Is())),Tn(L),null;case 26:var B=L.type,F=L.memoizedState;return z===null?(Yr(L),F===null?(Tn(L),Tu(L,B,null,I,R)):(Tn(L),zd(L,F))):F?F===z.memoizedState?(Tn(L),L.flags&=-16777217):(Yr(L),Tn(L),zd(L,F)):(z=z.memoizedProps,z!==I&&Yr(L),Tn(L),Tu(L,B,z,I,R)),null;case 27:if(wl(L),R=Wt.current,B=L.type,z!==null&&L.stateNode!=null)z.memoizedProps!==I&&Yr(L);else{if(!I){if(L.stateNode===null)throw Error(X(166));return Tn(L),null}z=Ht.current,ya(L)?cf(L,z):(z=O0(B,I,R),L.stateNode=z,Yr(L))}return Tn(L),null;case 5:if(wl(L),B=L.type,z!==null&&L.stateNode!=null)z.memoizedProps!==I&&Yr(L);else{if(!I){if(L.stateNode===null)throw Error(X(166));return Tn(L),null}if(F=Ht.current,ya(L))cf(L,F);else{var U=Vi(Wt.current);switch(F){case 1:F=U.createElementNS("http://www.w3.org/2000/svg",B);break;case 2:F=U.createElementNS("http://www.w3.org/1998/Math/MathML",B);break;default:switch(B){case"svg":F=U.createElementNS("http://www.w3.org/2000/svg",B);break;case"math":F=U.createElementNS("http://www.w3.org/1998/Math/MathML",B);break;case"script":F=U.createElement("div"),F.innerHTML="<script><\/script>",F=F.removeChild(F.firstChild);break;case"select":F=typeof I.is=="string"?U.createElement("select",{is:I.is}):U.createElement("select"),I.multiple?F.multiple=!0:I.size&&(F.size=I.size);break;default:F=typeof I.is=="string"?U.createElement(B,{is:I.is}):U.createElement(B)}}F[_n]=L,F[qn]=I;e:for(U=L.child;U!==null;){if(U.tag===5||U.tag===6)F.appendChild(U.stateNode);else if(U.tag!==4&&U.tag!==27&&U.child!==null){U.child.return=U,U=U.child;continue}if(U===L)break e;for(;U.sibling===null;){if(U.return===null||U.return===L)break e;U=U.return}U.sibling.return=U.return,U=U.sibling}L.stateNode=F;e:switch(Hn(F,B,I),B){case"button":case"input":case"select":case"textarea":I=!!I.autoFocus;break e;case"img":I=!0;break e;default:I=!1}I&&Yr(L)}}return Tn(L),Tu(L,L.type,z===null?null:z.memoizedProps,L.pendingProps,R),null;case 6:if(z&&L.stateNode!=null)z.memoizedProps!==I&&Yr(L);else{if(typeof I!="string"&&L.stateNode===null)throw Error(X(166));if(z=Wt.current,ya(L)){if(z=L.stateNode,R=L.memoizedProps,I=null,B=Vn,B!==null)switch(B.tag){case 27:case 5:I=B.memoizedProps}z[_n]=L,z=!!(z.nodeValue===R||I!==null&&I.suppressHydrationWarning===!0||E0(z.nodeValue,R)),z||nl(L,!0)}else z=Vi(z).createTextNode(I),z[_n]=L,L.stateNode=z}return Tn(L),null;case 31:if(R=L.memoizedState,z===null||z.memoizedState!==null){if(I=ya(L),R!==null){if(z===null){if(!I)throw Error(X(318));if(z=L.memoizedState,z=z===null?null:z.dehydrated,!z)throw Error(X(557));z[_n]=L}else Il(),!(L.flags&128)&&(L.memoizedState=null),L.flags|=4;Tn(L),z=!1}else R=Is(),z!==null&&z.memoizedState!==null&&(z.memoizedState.hydrationErrors=R),z=!0;if(!z)return L.flags&256?(or(L),L):(or(L),null);if(L.flags&128)throw Error(X(558))}return Tn(L),null;case 13:if(I=L.memoizedState,z===null||z.memoizedState!==null&&z.memoizedState.dehydrated!==null){if(B=ya(L),I!==null&&I.dehydrated!==null){if(z===null){if(!B)throw Error(X(318));if(B=L.memoizedState,B=B===null?null:B.dehydrated,!B)throw Error(X(317));B[_n]=L}else Il(),!(L.flags&128)&&(L.memoizedState=null),L.flags|=4;Tn(L),B=!1}else B=Is(),z!==null&&z.memoizedState!==null&&(z.memoizedState.hydrationErrors=B),B=!0;if(!B)return L.flags&256?(or(L),L):(or(L),null)}return or(L),L.flags&128?(L.lanes=R,L):(R=I!==null,z=z!==null&&z.memoizedState!==null,R&&(I=L.child,B=null,I.alternate!==null&&I.alternate.memoizedState!==null&&I.alternate.memoizedState.cachePool!==null&&(B=I.alternate.memoizedState.cachePool.pool),F=null,I.memoizedState!==null&&I.memoizedState.cachePool!==null&&(F=I.memoizedState.cachePool.pool),F!==B&&(I.flags|=2048)),R!==z&&R&&(L.child.flags|=8192),Ti(L,L.updateQueue),Tn(L),null);case 4:return yn(),z===null&&k0(L.stateNode.containerInfo),Tn(L),null;case 10:return Fr(L.type),Tn(L),null;case 19:if(St(Ln),I=L.memoizedState,I===null)return Tn(L),null;if(B=(L.flags&128)!=0,F=I.rendering,F===null)if(B)bo(I,!1);else{if(Nn!==0||z!==null&&z.flags&128)for(z=L.child;z!==null;){if(F=hi(z),F!==null){for(L.flags|=128,bo(I,!1),z=F.updateQueue,L.updateQueue=z,Ti(L,z),L.subtreeFlags=0,z=R,R=L.child;R!==null;)lf(R,z),R=R.sibling;return Mt(Ln,Ln.current&1|2),pn&&Ir(L,I.treeForkCount),L.child}z=z.sibling}I.tail!==null&&$n()>Mi&&(L.flags|=128,B=!0,bo(I,!1),L.lanes=4194304)}else{if(!B)if(z=hi(F),z!==null){if(L.flags|=128,B=!0,z=z.updateQueue,L.updateQueue=z,Ti(L,z),bo(I,!0),I.tail===null&&I.tailMode==="hidden"&&!F.alternate&&!pn)return Tn(L),null}else 2*$n()-I.renderingStartTime>Mi&&R!==536870912&&(L.flags|=128,B=!0,bo(I,!1),L.lanes=4194304);I.isBackwards?(F.sibling=L.child,L.child=F):(z=I.last,z===null?L.child=F:z.sibling=F,I.last=F)}return I.tail===null?(Tn(L),null):(z=I.tail,I.rendering=z,I.tail=z.sibling,I.renderingStartTime=$n(),z.sibling=null,R=Ln.current,Mt(Ln,B?R&1|2:R&1),pn&&Ir(L,I.treeForkCount),z);case 22:case 23:return or(L),Zs(),I=L.memoizedState!==null,z===null?I&&(L.flags|=8192):z.memoizedState!==null!==I&&(L.flags|=8192),I?R&536870912&&!(L.flags&128)&&(Tn(L),L.subtreeFlags&6&&(L.flags|=8192)):Tn(L),R=L.updateQueue,R!==null&&Ti(L,R.retryQueue),R=null,z!==null&&z.memoizedState!==null&&z.memoizedState.cachePool!==null&&(R=z.memoizedState.cachePool.pool),I=null,L.memoizedState!==null&&L.memoizedState.cachePool!==null&&(I=L.memoizedState.cachePool.pool),I!==R&&(L.flags|=2048),z!==null&&St(Ul),null;case 24:return R=null,z!==null&&(R=z.memoizedState.cache),L.memoizedState.cache!==R&&(L.flags|=2048),Fr(Dn),Tn(L),null;case 25:return null;case 30:return null}throw Error(X(156,L.tag))}function ah(z,L){switch(Rs(L),L.tag){case 1:return z=L.flags,z&65536?(L.flags=z&-65537|128,L):null;case 3:return Fr(Dn),yn(),z=L.flags,z&65536&&!(z&128)?(L.flags=z&-65537|128,L):null;case 26:case 27:case 5:return wl(L),null;case 31:if(L.memoizedState!==null){if(or(L),L.alternate===null)throw Error(X(340));Il()}return z=L.flags,z&65536?(L.flags=z&-65537|128,L):null;case 13:if(or(L),z=L.memoizedState,z!==null&&z.dehydrated!==null){if(L.alternate===null)throw Error(X(340));Il()}return z=L.flags,z&65536?(L.flags=z&-65537|128,L):null;case 19:return St(Ln),null;case 4:return yn(),null;case 10:return Fr(L.type),null;case 22:case 23:return or(L),Zs(),z!==null&&St(Ul),z=L.flags,z&65536?(L.flags=z&-65537|128,L):null;case 24:return Fr(Dn),null;case 25:return null;default:return null}}function Ad(z,L){switch(Rs(L),L.tag){case 3:Fr(Dn),yn();break;case 26:case 27:case 5:wl(L);break;case 4:yn();break;case 31:L.memoizedState!==null&&or(L);break;case 13:or(L);break;case 19:St(Ln);break;case 10:Fr(L.type);break;case 22:case 23:or(L),Zs(),z!==null&&St(Ul);break;case 24:Fr(Dn)}}function wo(z,L){try{var R=L.updateQueue,I=R===null?null:R.lastEffect;if(I!==null){var B=I.next;R=B;do{if((R.tag&z)===z){I=void 0;var F=R.create,U=R.inst;I=F(),U.destroy=I}R=R.next}while(R!==B)}}catch(V){wn(L,L.return,V)}}function il(z,L,R){try{var I=L.updateQueue,B=I===null?null:I.lastEffect;if(B!==null){var F=B.next;I=F;do{if((I.tag&z)===z){var U=I.inst,V=U.destroy;if(V!==void 0){U.destroy=void 0,B=L;var W=R,yt=V;try{yt()}catch(Ct){wn(B,W,Ct)}}}I=I.next}while(I!==F)}}catch(Ct){wn(L,L.return,Ct)}}function Nd(z){var L=z.updateQueue;if(L!==null){var R=z.stateNode;try{xf(L,R)}catch(I){wn(z,z.return,I)}}}function Ld(z,L,R){R.props=ql(z.type,z.memoizedProps),R.state=z.memoizedState;try{R.componentWillUnmount()}catch(I){wn(z,L,I)}}function ko(z,L){try{var R=z.ref;if(R!==null){switch(z.tag){case 26:case 27:case 5:var I=z.stateNode;break;case 30:I=z.stateNode;break;default:I=z.stateNode}typeof R=="function"?z.refCleanup=R(I):R.current=I}}catch(B){wn(z,L,B)}}function Ar(z,L){var R=z.ref,I=z.refCleanup;if(R!==null)if(typeof I=="function")try{I()}catch(B){wn(z,L,B)}finally{z.refCleanup=null,z=z.alternate,z!=null&&(z.refCleanup=null)}else if(typeof R=="function")try{R(null)}catch(B){wn(z,L,B)}else R.current=null}function Md(z){var L=z.type,R=z.memoizedProps,I=z.stateNode;try{e:switch(L){case"button":case"input":case"select":case"textarea":R.autoFocus&&I.focus();break e;case"img":R.src?I.src=R.src:R.srcSet&&(I.srcset=R.srcSet)}}catch(B){wn(z,z.return,B)}}function zu(z,L,R){try{var I=z.stateNode;Eh(I,z.type,R,L),I[qn]=L}catch(B){wn(z,z.return,B)}}function _d(z){return z.tag===5||z.tag===3||z.tag===26||z.tag===27&&hl(z.type)||z.tag===4}function Au(z){e:for(;;){for(;z.sibling===null;){if(z.return===null||_d(z.return))return null;z=z.return}for(z.sibling.return=z.return,z=z.sibling;z.tag!==5&&z.tag!==6&&z.tag!==18;){if(z.tag===27&&hl(z.type)||z.flags&2||z.child===null||z.tag===4)continue e;z.child.return=z,z=z.child}if(!(z.flags&2))return z.stateNode}}function Nu(z,L,R){var I=z.tag;if(I===5||I===6)z=z.stateNode,L?(R.nodeType===9?R.body:R.nodeName==="HTML"?R.ownerDocument.body:R).insertBefore(z,L):(L=R.nodeType===9?R.body:R.nodeName==="HTML"?R.ownerDocument.body:R,L.appendChild(z),R=R._reactRootContainer,R!=null||L.onclick!==null||(L.onclick=Dr));else if(I!==4&&(I===27&&hl(z.type)&&(R=z.stateNode,L=null),z=z.child,z!==null))for(Nu(z,L,R),z=z.sibling;z!==null;)Nu(z,L,R),z=z.sibling}function zi(z,L,R){var I=z.tag;if(I===5||I===6)z=z.stateNode,L?R.insertBefore(z,L):R.appendChild(z);else if(I!==4&&(I===27&&hl(z.type)&&(R=z.stateNode),z=z.child,z!==null))for(zi(z,L,R),z=z.sibling;z!==null;)zi(z,L,R),z=z.sibling}function Dd(z){var L=z.stateNode,R=z.memoizedProps;try{for(var I=z.type,B=L.attributes;B.length;)L.removeAttributeNode(B[0]);Hn(L,I,R),L[_n]=z,L[qn]=R}catch(F){wn(z,z.return,F)}}var Gr=!1,In=!1,Lu=!1,Rd=typeof WeakSet=="function"?WeakSet:Set,Un=null;function oh(z,L){if(z=z.containerInfo,Qu=Wi,z=Wc(z),Cs(z)){if("selectionStart"in z)var R={start:z.selectionStart,end:z.selectionEnd};else e:{R=(R=z.ownerDocument)&&R.defaultView||window;var I=R.getSelection&&R.getSelection();if(I&&I.rangeCount!==0){R=I.anchorNode;var B=I.anchorOffset,F=I.focusNode;I=I.focusOffset;try{R.nodeType,F.nodeType}catch{R=null;break e}var U=0,V=-1,W=-1,yt=0,Ct=0,zt=z,bt=null;t:for(;;){for(var wt;zt!==R||B!==0&&zt.nodeType!==3||(V=U+B),zt!==F||I!==0&&zt.nodeType!==3||(W=U+I),zt.nodeType===3&&(U+=zt.nodeValue.length),(wt=zt.firstChild)!==null;)bt=zt,zt=wt;for(;;){if(zt===z)break t;if(bt===R&&++yt===B&&(V=U),bt===F&&++Ct===I&&(W=U),(wt=zt.nextSibling)!==null)break;zt=bt,bt=zt.parentNode}zt=wt}R=V===-1||W===-1?null:{start:V,end:W}}else R=null}R||(R={start:0,end:0})}else R=null;for(Ku={focusedElem:z,selectionRange:R},Wi=!1,Un=L;Un!==null;)if(L=Un,z=L.child,L.subtreeFlags&1028&&z!==null)z.return=L,Un=z;else for(;Un!==null;){switch(L=Un,F=L.alternate,z=L.flags,L.tag){case 0:if(z&4&&(z=L.updateQueue,z=z===null?null:z.events,z!==null))for(R=0;R<z.length;R++)B=z[R],B.ref.impl=B.nextImpl;break;case 11:case 15:break;case 1:if(z&1024&&F!==null){z=void 0,R=L,B=F.memoizedProps,F=F.memoizedState,I=R.stateNode;try{var jt=ql(R.type,B);z=I.getSnapshotBeforeUpdate(jt,F),I.__reactInternalSnapshotBeforeUpdate=z}catch(rn){wn(R,R.return,rn)}}break;case 3:if(z&1024){if(z=L.stateNode.containerInfo,R=z.nodeType,R===9)tc(z);else if(R===1)switch(z.nodeName){case"HEAD":case"HTML":case"BODY":tc(z);break;default:z.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if(z&1024)throw Error(X(163))}if(z=L.sibling,z!==null){z.return=L.return,Un=z;break}Un=L.return}}function Od(z,L,R){var I=R.flags;switch(R.tag){case 0:case 11:case 15:$r(z,R),I&4&&wo(5,R);break;case 1:if($r(z,R),I&4)if(z=R.stateNode,L===null)try{z.componentDidMount()}catch(U){wn(R,R.return,U)}else{var B=ql(R.type,L.memoizedProps);L=L.memoizedState;try{z.componentDidUpdate(B,L,z.__reactInternalSnapshotBeforeUpdate)}catch(U){wn(R,R.return,U)}}I&64&&Nd(R),I&512&&ko(R,R.return);break;case 3:if($r(z,R),I&64&&(z=R.updateQueue,z!==null)){if(L=null,R.child!==null)switch(R.child.tag){case 27:case 5:L=R.child.stateNode;break;case 1:L=R.child.stateNode}try{xf(z,L)}catch(U){wn(R,R.return,U)}}break;case 27:L===null&&I&4&&Dd(R);case 26:case 5:$r(z,R),L===null&&I&4&&Md(R),I&512&&ko(R,R.return);break;case 12:$r(z,R);break;case 31:$r(z,R),I&4&&Fd(z,R);break;case 13:$r(z,R),I&4&&Ud(z,R),I&64&&(z=R.memoizedState,z!==null&&(z=z.dehydrated,z!==null&&(R=gh.bind(null,R),_h(z,R))));break;case 22:if(I=R.memoizedState!==null||Gr,!I){L=L!==null&&L.memoizedState!==null||In,B=Gr;var F=In;Gr=I,(In=L)&&!F?qr(z,R,(R.subtreeFlags&8772)!=0):$r(z,R),Gr=B,In=F}break;case 30:break;default:$r(z,R)}}function Id(z){var L=z.alternate;L!==null&&(z.alternate=null,Id(L)),z.child=null,z.deletions=null,z.sibling=null,z.tag===5&&(L=z.stateNode,L!==null&&is(L)),z.stateNode=null,z.return=null,z.dependencies=null,z.memoizedProps=null,z.memoizedState=null,z.pendingProps=null,z.stateNode=null,z.updateQueue=null}var zn=null,Kn=!1;function Hr(z,L,R){for(R=R.child;R!==null;)Bd(z,L,R),R=R.sibling}function Bd(z,L,R){if(jn&&typeof jn.onCommitFiberUnmount=="function")try{jn.onCommitFiberUnmount(xl,R)}catch{}switch(R.tag){case 26:In||Ar(R,L),Hr(z,L,R),R.memoizedState?R.memoizedState.count--:R.stateNode&&(R=R.stateNode,R.parentNode.removeChild(R));break;case 27:In||Ar(R,L);var I=zn,B=Kn;hl(R.type)&&(zn=R.stateNode,Kn=!1),Hr(z,L,R),No(R.stateNode),zn=I,Kn=B;break;case 5:In||Ar(R,L);case 6:if(I=zn,B=Kn,zn=null,Hr(z,L,R),zn=I,Kn=B,zn!==null)if(Kn)try{(zn.nodeType===9?zn.body:zn.nodeName==="HTML"?zn.ownerDocument.body:zn).removeChild(R.stateNode)}catch(F){wn(R,L,F)}else try{zn.removeChild(R.stateNode)}catch(F){wn(R,L,F)}break;case 18:zn!==null&&(Kn?(z=zn,L0(z.nodeType===9?z.body:z.nodeName==="HTML"?z.ownerDocument.body:z,R.stateNode),Fa(z)):L0(zn,R.stateNode));break;case 4:I=zn,B=Kn,zn=R.stateNode.containerInfo,Kn=!0,Hr(z,L,R),zn=I,Kn=B;break;case 0:case 11:case 14:case 15:il(2,R,L),In||il(4,R,L),Hr(z,L,R);break;case 1:In||(Ar(R,L),I=R.stateNode,typeof I.componentWillUnmount=="function"&&Ld(R,L,I)),Hr(z,L,R);break;case 21:Hr(z,L,R);break;case 22:In=(I=In)||R.memoizedState!==null,Hr(z,L,R),In=I;break;default:Hr(z,L,R)}}function Fd(z,L){if(L.memoizedState===null&&(z=L.alternate,z!==null&&(z=z.memoizedState,z!==null))){z=z.dehydrated;try{Fa(z)}catch(R){wn(L,L.return,R)}}}function Ud(z,L){if(L.memoizedState===null&&(z=L.alternate,z!==null&&(z=z.memoizedState,z!==null&&(z=z.dehydrated,z!==null))))try{Fa(z)}catch(R){wn(L,L.return,R)}}function ih(z){switch(z.tag){case 31:case 13:case 19:var L=z.stateNode;return L===null&&(L=z.stateNode=new Rd),L;case 22:return z=z.stateNode,L=z._retryCache,L===null&&(L=z._retryCache=new Rd),L;default:throw Error(X(435,z.tag))}}function Ai(z,L){var R=ih(z);L.forEach(function(I){if(!R.has(I)){R.add(I);var B=mh.bind(null,z,I);I.then(B,B)}})}function Jn(z,L){var R=L.deletions;if(R!==null)for(var I=0;I<R.length;I++){var B=R[I],F=z,U=L,V=U;e:for(;V!==null;){switch(V.tag){case 27:if(hl(V.type)){zn=V.stateNode,Kn=!1;break e}break;case 5:zn=V.stateNode,Kn=!1;break e;case 3:case 4:zn=V.stateNode.containerInfo,Kn=!0;break e}V=V.return}if(zn===null)throw Error(X(160));Bd(F,U,B),zn=null,Kn=!1,F=B.alternate,F!==null&&(F.return=null),B.return=null}if(L.subtreeFlags&13886)for(L=L.child;L!==null;)Xd(L,z),L=L.sibling}var Cr=null;function Xd(z,L){var R=z.alternate,I=z.flags;switch(z.tag){case 0:case 11:case 14:case 15:Jn(L,z),er(z),I&4&&(il(3,z,z.return),wo(3,z),il(5,z,z.return));break;case 1:Jn(L,z),er(z),I&512&&(In||R===null||Ar(R,R.return)),I&64&&Gr&&(z=z.updateQueue,z!==null&&(I=z.callbacks,I!==null&&(R=z.shared.hiddenCallbacks,z.shared.hiddenCallbacks=R===null?I:R.concat(I))));break;case 26:var B=Cr;if(Jn(L,z),er(z),I&512&&(In||R===null||Ar(R,R.return)),I&4){var F=R===null?null:R.memoizedState;if(I=z.memoizedState,R===null)if(I===null)if(z.stateNode===null){e:{I=z.type,R=z.memoizedProps,B=B.ownerDocument||B;t:switch(I){case"title":F=B.getElementsByTagName("title")[0],(!F||F[qa]||F[_n]||F.namespaceURI==="http://www.w3.org/2000/svg"||F.hasAttribute("itemprop"))&&(F=B.createElement(I),B.head.insertBefore(F,B.querySelector("head > title"))),Hn(F,I,R),F[_n]=z,Fn(F),I=F;break e;case"link":var U=V0("link","href",B).get(I+(R.href||""));if(U){for(var V=0;V<U.length;V++)if(F=U[V],F.getAttribute("href")===(R.href==null||R.href===""?null:R.href)&&F.getAttribute("rel")===(R.rel==null?null:R.rel)&&F.getAttribute("title")===(R.title==null?null:R.title)&&F.getAttribute("crossorigin")===(R.crossOrigin==null?null:R.crossOrigin)){U.splice(V,1);break t}}F=B.createElement(I),Hn(F,I,R),B.head.appendChild(F);break;case"meta":if(U=V0("meta","content",B).get(I+(R.content||""))){for(V=0;V<U.length;V++)if(F=U[V],F.getAttribute("content")===(R.content==null?null:""+R.content)&&F.getAttribute("name")===(R.name==null?null:R.name)&&F.getAttribute("property")===(R.property==null?null:R.property)&&F.getAttribute("http-equiv")===(R.httpEquiv==null?null:R.httpEquiv)&&F.getAttribute("charset")===(R.charSet==null?null:R.charSet)){U.splice(V,1);break t}}F=B.createElement(I),Hn(F,I,R),B.head.appendChild(F);break;default:throw Error(X(468,I))}F[_n]=z,Fn(F),I=F}z.stateNode=I}else Y0(B,z.type,z.stateNode);else z.stateNode=X0(B,I,z.memoizedProps);else F===I?I===null&&z.stateNode!==null&&zu(z,z.memoizedProps,R.memoizedProps):(F===null?R.stateNode!==null&&(R=R.stateNode,R.parentNode.removeChild(R)):F.count--,I===null?Y0(B,z.type,z.stateNode):X0(B,I,z.memoizedProps))}break;case 27:Jn(L,z),er(z),I&512&&(In||R===null||Ar(R,R.return)),R!==null&&I&4&&zu(z,z.memoizedProps,R.memoizedProps);break;case 5:if(Jn(L,z),er(z),I&512&&(In||R===null||Ar(R,R.return)),z.flags&32){B=z.stateNode;try{sa(B,"")}catch(jt){wn(z,z.return,jt)}}I&4&&z.stateNode!=null&&(B=z.memoizedProps,zu(z,B,R===null?B:R.memoizedProps)),I&1024&&(Lu=!0);break;case 6:if(Jn(L,z),er(z),I&4){if(z.stateNode===null)throw Error(X(162));I=z.memoizedProps,R=z.stateNode;try{R.nodeValue=I}catch(jt){wn(z,z.return,jt)}}break;case 3:if(Hi=null,B=Cr,Cr=Yi(L.containerInfo),Jn(L,z),Cr=B,er(z),I&4&&R!==null&&R.memoizedState.isDehydrated)try{Fa(L.containerInfo)}catch(jt){wn(z,z.return,jt)}Lu&&(Lu=!1,Vd(z));break;case 4:I=Cr,Cr=Yi(z.stateNode.containerInfo),Jn(L,z),er(z),Cr=I;break;case 12:Jn(L,z),er(z);break;case 31:Jn(L,z),er(z),I&4&&(I=z.updateQueue,I!==null&&(z.updateQueue=null,Ai(z,I)));break;case 13:Jn(L,z),er(z),z.child.flags&8192&&z.memoizedState!==null!=(R!==null&&R.memoizedState!==null)&&(Li=$n()),I&4&&(I=z.updateQueue,I!==null&&(z.updateQueue=null,Ai(z,I)));break;case 22:B=z.memoizedState!==null;var W=R!==null&&R.memoizedState!==null,yt=Gr,Ct=In;if(Gr=yt||B,In=Ct||W,Jn(L,z),In=Ct,Gr=yt,er(z),I&8192)e:for(L=z.stateNode,L._visibility=B?L._visibility&-2:L._visibility|1,B&&(R===null||W||Gr||In||jl(z)),R=null,L=z;;){if(L.tag===5||L.tag===26){if(R===null){W=R=L;try{if(F=W.stateNode,B)U=F.style,typeof U.setProperty=="function"?U.setProperty("display","none","important"):U.display="none";else{V=W.stateNode;var zt=W.memoizedProps.style,bt=zt!=null&&zt.hasOwnProperty("display")?zt.display:null;V.style.display=bt==null||typeof bt=="boolean"?"":(""+bt).trim()}}catch(jt){wn(W,W.return,jt)}}}else if(L.tag===6){if(R===null){W=L;try{W.stateNode.nodeValue=B?"":W.memoizedProps}catch(jt){wn(W,W.return,jt)}}}else if(L.tag===18){if(R===null){W=L;try{var wt=W.stateNode;B?M0(wt,!0):M0(W.stateNode,!1)}catch(jt){wn(W,W.return,jt)}}}else if((L.tag!==22&&L.tag!==23||L.memoizedState===null||L===z)&&L.child!==null){L.child.return=L,L=L.child;continue}if(L===z)break e;for(;L.sibling===null;){if(L.return===null||L.return===z)break e;R===L&&(R=null),L=L.return}R===L&&(R=null),L.sibling.return=L.return,L=L.sibling}I&4&&(I=z.updateQueue,I!==null&&(R=I.retryQueue,R!==null&&(I.retryQueue=null,Ai(z,R))));break;case 19:Jn(L,z),er(z),I&4&&(I=z.updateQueue,I!==null&&(z.updateQueue=null,Ai(z,I)));break;case 30:break;case 21:break;default:Jn(L,z),er(z)}}function er(z){var L=z.flags;if(L&2){try{for(var R,I=z.return;I!==null;){if(_d(I)){R=I;break}I=I.return}if(R==null)throw Error(X(160));switch(R.tag){case 27:var B=R.stateNode;zi(z,Au(z),B);break;case 5:var F=R.stateNode;R.flags&32&&(sa(F,""),R.flags&=-33),zi(z,Au(z),F);break;case 3:case 4:var U=R.stateNode.containerInfo;Nu(z,Au(z),U);break;default:throw Error(X(161))}}catch(V){wn(z,z.return,V)}z.flags&=-3}L&4096&&(z.flags&=-4097)}function Vd(z){if(z.subtreeFlags&1024)for(z=z.child;z!==null;){var L=z;Vd(L),L.tag===5&&L.flags&1024&&L.stateNode.reset(),z=z.sibling}}function $r(z,L){if(L.subtreeFlags&8772)for(L=L.child;L!==null;)Od(z,L.alternate,L),L=L.sibling}function jl(z){for(z=z.child;z!==null;){var L=z;switch(L.tag){case 0:case 11:case 14:case 15:il(4,L,L.return),jl(L);break;case 1:Ar(L,L.return);var R=L.stateNode;typeof R.componentWillUnmount=="function"&&Ld(L,L.return,R),jl(L);break;case 27:No(L.stateNode);case 26:case 5:Ar(L,L.return),jl(L);break;case 22:L.memoizedState===null&&jl(L);break;case 30:jl(L);break;default:jl(L)}z=z.sibling}}function qr(z,L,R){for(R&&(R=(L.subtreeFlags&8772)!=0),L=L.child;L!==null;){var I=L.alternate,B=z,F=L,U=F.flags;switch(F.tag){case 0:case 11:case 15:qr(B,F,R),wo(4,F);break;case 1:if(qr(B,F,R),I=F,B=I.stateNode,typeof B.componentDidMount=="function")try{B.componentDidMount()}catch(yt){wn(I,I.return,yt)}if(I=F,B=I.updateQueue,B!==null){var V=I.stateNode;try{var W=B.shared.hiddenCallbacks;if(W!==null)for(B.shared.hiddenCallbacks=null,B=0;B<W.length;B++)Sf(W[B],V)}catch(yt){wn(I,I.return,yt)}}R&&U&64&&Nd(F),ko(F,F.return);break;case 27:Dd(F);case 26:case 5:qr(B,F,R),R&&I===null&&U&4&&Md(F),ko(F,F.return);break;case 12:qr(B,F,R);break;case 31:qr(B,F,R),R&&U&4&&Fd(B,F);break;case 13:qr(B,F,R),R&&U&4&&Ud(B,F);break;case 22:F.memoizedState===null&&qr(B,F,R),ko(F,F.return);break;case 30:break;default:qr(B,F,R)}L=L.sibling}}function Mu(z,L){var R=null;z!==null&&z.memoizedState!==null&&z.memoizedState.cachePool!==null&&(R=z.memoizedState.cachePool.pool),z=null,L.memoizedState!==null&&L.memoizedState.cachePool!==null&&(z=L.memoizedState.cachePool.pool),z!==R&&(z!=null&&z.refCount++,R!=null&&oo(R))}function _u(z,L){z=null,L.alternate!==null&&(z=L.alternate.memoizedState.cache),L=L.memoizedState.cache,L!==z&&(L.refCount++,z!=null&&oo(z))}function Er(z,L,R,I){if(L.subtreeFlags&10256)for(L=L.child;L!==null;)Yd(z,L,R,I),L=L.sibling}function Yd(z,L,R,I){var B=L.flags;switch(L.tag){case 0:case 11:case 15:Er(z,L,R,I),B&2048&&wo(9,L);break;case 1:Er(z,L,R,I);break;case 3:Er(z,L,R,I),B&2048&&(z=null,L.alternate!==null&&(z=L.alternate.memoizedState.cache),L=L.memoizedState.cache,L!==z&&(L.refCount++,z!=null&&oo(z)));break;case 12:if(B&2048){Er(z,L,R,I),z=L.stateNode;try{var F=L.memoizedProps,U=F.id,V=F.onPostCommit;typeof V=="function"&&V(U,L.alternate===null?"mount":"update",z.passiveEffectDuration,-0)}catch(W){wn(L,L.return,W)}}else Er(z,L,R,I);break;case 31:Er(z,L,R,I);break;case 13:Er(z,L,R,I);break;case 23:break;case 22:F=L.stateNode,U=L.alternate,L.memoizedState===null?F._visibility&2?Er(z,L,R,I):(F._visibility|=2,za(z,L,R,I,(L.subtreeFlags&10256)!=0||!1)):F._visibility&2?Er(z,L,R,I):So(z,L),B&2048&&Mu(U,L);break;case 24:Er(z,L,R,I),B&2048&&_u(L.alternate,L);break;default:Er(z,L,R,I)}}function za(z,L,R,I,B){for(B&&(B=(L.subtreeFlags&10256)!=0||!1),L=L.child;L!==null;){var F=z,U=L,V=R,W=I,yt=U.flags;switch(U.tag){case 0:case 11:case 15:za(F,U,V,W,B),wo(8,U);break;case 23:break;case 22:var Ct=U.stateNode;U.memoizedState===null?(Ct._visibility|=2,za(F,U,V,W,B)):Ct._visibility&2?za(F,U,V,W,B):So(F,U),B&&yt&2048&&Mu(U.alternate,U);break;case 24:za(F,U,V,W,B),B&&yt&2048&&_u(U.alternate,U);break;default:za(F,U,V,W,B)}L=L.sibling}}function So(z,L){if(L.subtreeFlags&10256)for(L=L.child;L!==null;){var R=z,I=L,B=I.flags;switch(I.tag){case 22:So(R,I),B&2048&&Mu(I.alternate,I);break;case 24:So(R,I),B&2048&&_u(I.alternate,I);break;default:So(R,I)}L=L.sibling}}var xo=8192;function Aa(z,L,R){if(z.subtreeFlags&xo)for(z=z.child;z!==null;)Gd(z,L,R),z=z.sibling}function Gd(z,L,R){switch(z.tag){case 26:Aa(z,L,R),z.flags&xo&&z.memoizedState!==null&&Hh(R,Cr,z.memoizedState,z.memoizedProps);break;case 5:Aa(z,L,R);break;case 3:case 4:var I=Cr;Cr=Yi(z.stateNode.containerInfo),Aa(z,L,R),Cr=I;break;case 22:z.memoizedState===null&&(I=z.alternate,I!==null&&I.memoizedState!==null?(I=xo,xo=16777216,Aa(z,L,R),xo=I):Aa(z,L,R));break;default:Aa(z,L,R)}}function Hd(z){var L=z.alternate;if(L!==null&&(z=L.child,z!==null)){L.child=null;do L=z.sibling,z.sibling=null,z=L;while(z!==null)}}function Co(z){var L=z.deletions;if(z.flags&16){if(L!==null)for(var R=0;R<L.length;R++){var I=L[R];Un=I,qd(I,z)}Hd(z)}if(z.subtreeFlags&10256)for(z=z.child;z!==null;)$d(z),z=z.sibling}function $d(z){switch(z.tag){case 0:case 11:case 15:Co(z),z.flags&2048&&il(9,z,z.return);break;case 3:Co(z);break;case 12:Co(z);break;case 22:var L=z.stateNode;z.memoizedState!==null&&L._visibility&2&&(z.return===null||z.return.tag!==13)?(L._visibility&=-3,Ni(z)):Co(z);break;default:Co(z)}}function Ni(z){var L=z.deletions;if(z.flags&16){if(L!==null)for(var R=0;R<L.length;R++){var I=L[R];Un=I,qd(I,z)}Hd(z)}for(z=z.child;z!==null;){switch(L=z,L.tag){case 0:case 11:case 15:il(8,L,L.return),Ni(L);break;case 22:R=L.stateNode,R._visibility&2&&(R._visibility&=-3,Ni(L));break;default:Ni(L)}z=z.sibling}}function qd(z,L){for(;Un!==null;){var R=Un;switch(R.tag){case 0:case 11:case 15:il(8,R,L);break;case 23:case 22:if(R.memoizedState!==null&&R.memoizedState.cachePool!==null){var I=R.memoizedState.cachePool.pool;I!=null&&I.refCount++}break;case 24:oo(R.memoizedState.cache)}if(I=R.child,I!==null)I.return=R,Un=I;else e:for(R=z;Un!==null;){I=Un;var B=I.sibling,F=I.return;if(Id(I),I===R){Un=null;break e}if(B!==null){B.return=F,Un=B;break e}Un=F}}}var sh={getCacheForType:function(z){var L=Yn(Dn),R=L.data.get(z);return R===void 0&&(R=z(),L.data.set(z,R)),R},cacheSignal:function(){return Yn(Dn).controller.signal}},uh=typeof WeakMap=="function"?WeakMap:Map,gn=0,En=null,un=null,fn=0,bn=0,ir=null,sl=!1,Na=!1,Du=!1,jr=0,Nn=0,ul=0,Wl=0,Ru=0,sr=0,La=0,Eo=null,tr=null,Ou=!1,Li=0,jd=0,Mi=1/0,_i=null,cl=null,Bn=0,fl=null,Ma=null,Wr=0,Iu=0,Bu=null,Wd=null,Po=0,Fu=null;function vr(){return gn&2&&fn!==0?fn&-fn:Tt.T===null?Yo():Hu()}function Zd(){if(sr===0)if(!(fn&536870912)||pn){var z=Cl;Cl<<=1,!(Cl&3932160)&&(Cl=262144),sr=z}else sr=536870912;return z=ar.current,z!==null&&(z.flags|=32),sr}function nr(z,L,R){(z===En&&(bn===2||bn===9)||z.cancelPendingCommit!==null)&&(_a(z,0),dl(z,fn,sr,!1)),Tl(z,R),(!(gn&2)||z!==En)&&(z===En&&(!(gn&2)&&(Wl|=R),Nn===4&&dl(z,fn,sr,!1)),Zr(z))}function Qd(z,L,R){if(gn&6)throw Error(X(327));var I=!R&&(L&127)==0&&(L&z.expiredLanes)===0||cr(z,L),B=I?dh(z,L):Xu(z,L,!0),F=I;do{if(B===0){Na&&!I&&dl(z,L,0,!1);break}else{if(R=z.current.alternate,F&&!ch(R)){B=Xu(z,L,!1),F=!1;continue}if(B===2){if(F=L,z.errorRecoveryDisabledLanes&F)var U=0;else U=z.pendingLanes&-536870913,U=U===0?U&536870912?536870912:0:U;if(U!==0){L=U;e:{var V=z;B=Eo;var W=V.current.memoizedState.isDehydrated;if(W&&(_a(V,U).flags|=256),U=Xu(V,U,!1),U!==2){if(Du&&!W){V.errorRecoveryDisabledLanes|=F,Wl|=F,B=4;break e}F=tr,tr=B,F!==null&&(tr===null?tr=F:tr.push.apply(tr,F))}B=U}if(F=!1,B!==2)continue}}if(B===1){_a(z,0),dl(z,L,0,!0);break}e:{switch(I=z,F=B,F){case 0:case 1:throw Error(X(345));case 4:if((L&4194048)!==L)break;case 6:dl(I,L,sr,!sl);break e;case 2:tr=null;break;case 3:case 5:break;default:throw Error(X(329))}if((L&62914560)===L&&(B=Li+300-$n(),10<B)){if(dl(I,L,sr,!sl),Kr(I,0,!0)!==0)break e;Wr=L,I.timeoutHandle=A0(Kd.bind(null,I,R,tr,_i,Ou,L,sr,Wl,La,sl,F,"Throttled",-0,0),B);break e}Kd(I,R,tr,_i,Ou,L,sr,Wl,La,sl,F,null,-0,0)}}break}while(!0);Zr(z)}function Kd(z,L,R,I,B,F,U,V,W,yt,Ct,zt,bt,wt){if(z.timeoutHandle=-1,zt=L.subtreeFlags,zt&8192||(zt&16785408)==16785408){zt={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Dr},Gd(L,F,zt);var jt=(F&62914560)===F?Li-$n():(F&4194048)===F?jd-$n():0;if(jt=$h(zt,jt),jt!==null){Wr=F,z.cancelPendingCommit=jt(o0.bind(null,z,L,F,R,I,B,U,V,W,Ct,zt,null,bt,wt)),dl(z,F,U,!yt);return}}o0(z,L,F,R,I,B,U,V,W)}function ch(z){for(var L=z;;){var R=L.tag;if((R===0||R===11||R===15)&&L.flags&16384&&(R=L.updateQueue,R!==null&&(R=R.stores,R!==null)))for(var I=0;I<R.length;I++){var B=R[I],F=B.getSnapshot;B=B.value;try{if(!rr(F(),B))return!1}catch{return!1}}if(R=L.child,L.subtreeFlags&16384&&R!==null)R.return=L,L=R;else{if(L===z)break;for(;L.sibling===null;){if(L.return===null||L.return===z)return!0;L=L.return}L.sibling.return=L.return,L=L.sibling}}return!0}function dl(z,L,R,I){L&=~Ru,L&=~Wl,z.suspendedLanes|=L,z.pingedLanes&=~L,I&&(z.warmLanes|=L),I=z.expirationTimes;for(var B=L;0<B;){var F=31-Xn(B),U=1<<F;I[F]=-1,B&=~U}R!==0&&zl(z,R,L)}function Di(){return gn&6?!0:(To(0,!1),!1)}function Uu(){if(un!==null){if(bn===0)var z=un.return;else z=un,Br=Bl=null,nu(z),xa=null,so=0,z=un;for(;z!==null;)Ad(z.alternate,z),z=z.return;un=null}}function _a(z,L){var R=z.timeoutHandle;R!==-1&&(z.timeoutHandle=-1,zh(R)),R=z.cancelPendingCommit,R!==null&&(z.cancelPendingCommit=null,R()),Wr=0,Uu(),En=z,un=R=Or(z.current,null),fn=L,bn=0,ir=null,sl=!1,Na=cr(z,L),Du=!1,La=sr=Ru=Wl=ul=Nn=0,tr=Eo=null,Ou=!1,L&8&&(L|=L&32);var I=z.entangledLanes;if(I!==0)for(z=z.entanglements,I&=L;0<I;){var B=31-Xn(I),F=1<<B;L|=z[B],I&=~F}return jr=L,ti(),R}function Jd(z,L){an=null,Tt.H=vo,L===Sa||L===ui?(L=yf(),bn=3):L===Gs?(L=yf(),bn=4):bn=L===yu?8:typeof L=="object"&&L&&typeof L.then=="function"?6:1,ir=L,un===null&&(Nn=1,xi(z,pr(L,z.current)))}function e0(){var z=ar.current;return z===null?!0:(fn&4194048)===fn?xr===null:(fn&62914560)===fn||fn&536870912?z===xr:!1}function t0(){var z=Tt.H;return Tt.H=vo,z===null?vo:z}function n0(){var z=Tt.A;return Tt.A=sh,z}function Ri(){Nn=4,sl||(fn&4194048)!==fn&&ar.current!==null||(Na=!0),!(ul&134217727)&&!(Wl&134217727)||En===null||dl(En,fn,sr,!1)}function Xu(z,L,R){var I=gn;gn|=2;var B=t0(),F=n0();(En!==z||fn!==L)&&(_i=null,_a(z,L)),L=!1;var U=Nn;e:do try{if(bn!==0&&un!==null){var V=un,W=ir;switch(bn){case 8:Uu(),U=6;break e;case 3:case 2:case 9:case 6:ar.current===null&&(L=!0);var yt=bn;if(bn=0,ir=null,Da(z,V,W,yt),R&&Na){U=0;break e}break;default:yt=bn,bn=0,ir=null,Da(z,V,W,yt)}}fh(),U=Nn;break}catch(Ct){Jd(z,Ct)}while(!0);return L&&z.shellSuspendCounter++,Br=Bl=null,gn=I,Tt.H=B,Tt.A=F,un===null&&(En=null,fn=0,ti()),U}function fh(){for(;un!==null;)r0(un)}function dh(z,L){var R=gn;gn|=2;var I=t0(),B=n0();En!==z||fn!==L?(_i=null,Mi=$n()+500,_a(z,L)):Na=cr(z,L);e:do try{if(bn!==0&&un!==null){L=un;var F=ir;t:switch(bn){case 1:bn=0,ir=null,Da(z,L,F,1);break;case 2:case 9:if(mf(F)){bn=0,ir=null,l0(L);break}L=function(){bn!==2&&bn!==9||En!==z||(bn=7),Zr(z)},F.then(L,L);break e;case 3:bn=7;break e;case 4:bn=5;break e;case 7:mf(F)?(bn=0,ir=null,l0(L)):(bn=0,ir=null,Da(z,L,F,7));break;case 5:var U=null;switch(un.tag){case 26:U=un.memoizedState;case 5:case 27:var V=un;if(U?G0(U):V.stateNode.complete){bn=0,ir=null;var W=V.sibling;if(W!==null)un=W;else{var yt=V.return;yt===null?un=null:(un=yt,Oi(yt))}break t}}bn=0,ir=null,Da(z,L,F,5);break;case 6:bn=0,ir=null,Da(z,L,F,6);break;case 8:Uu(),Nn=6;break e;default:throw Error(X(462))}}ph();break}catch(Ct){Jd(z,Ct)}while(!0);return Br=Bl=null,Tt.H=I,Tt.A=B,gn=R,un===null?(En=null,fn=0,ti(),Nn):0}function ph(){for(;un!==null&&!Ya();)r0(un)}function r0(z){var L=Td(z.alternate,z,jr);z.memoizedProps=z.pendingProps,L===null?Oi(z):un=L}function l0(z){var L=z,R=L.alternate;switch(L.tag){case 15:case 0:L=kd(R,L,L.pendingProps,L.type,void 0,fn);break;case 11:L=kd(R,L,L.pendingProps,L.type.render,L.ref,fn);break;case 5:nu(L);default:Ad(R,L),L=un=lf(L,jr),L=Td(R,L,jr)}z.memoizedProps=z.pendingProps,L===null?Oi(z):un=L}function Da(z,L,R,I){Br=Bl=null,nu(L),xa=null,so=0;var B=L.return;try{if(th(z,B,L,R,fn)){Nn=1,xi(z,pr(R,z.current)),un=null;return}}catch(F){if(B!==null)throw un=B,F;Nn=1,xi(z,pr(R,z.current)),un=null;return}L.flags&32768?(pn||I===1?z=!0:Na||fn&536870912?z=!1:(sl=z=!0,(I===2||I===9||I===3||I===6)&&(I=ar.current,I!==null&&I.tag===13&&(I.flags|=16384))),a0(L,z)):Oi(L)}function Oi(z){var L=z;do{if(L.flags&32768){a0(L,sl);return}z=L.return;var R=lh(L.alternate,L,jr);if(R!==null){un=R;return}if(L=L.sibling,L!==null){un=L;return}un=L=z}while(L!==null);Nn===0&&(Nn=5)}function a0(z,L){do{var R=ah(z.alternate,z);if(R!==null){R.flags&=32767,un=R;return}if(R=z.return,R!==null&&(R.flags|=32768,R.subtreeFlags=0,R.deletions=null),!L&&(z=z.sibling,z!==null)){un=z;return}un=z=R}while(z!==null);Nn=6,un=null}function o0(z,L,R,I,B,F,U,V,W){z.cancelPendingCommit=null;do Ii();while(Bn!==0);if(gn&6)throw Error(X(327));if(L!==null){if(L===z.current)throw Error(X(177));if(F=L.lanes|L.childLanes,F|=As,ea(z,R,F,U,V,W),z===En&&(un=En=null,fn=0),Ma=L,fl=z,Wr=R,Iu=F,Bu=B,Wd=I,L.subtreeFlags&10256||L.flags&10256?(z.callbackNode=null,z.callbackPriority=0,vh(Sl,function(){return f0(),null})):(z.callbackNode=null,z.callbackPriority=0),I=(L.flags&13878)!=0,L.subtreeFlags&13878||I){I=Tt.T,Tt.T=null,B=Lt.p,Lt.p=2,U=gn,gn|=4;try{oh(z,L,R)}finally{gn=U,Lt.p=B,Tt.T=I}}Bn=1,i0(),s0(),u0()}}function i0(){if(Bn===1){Bn=0;var z=fl,L=Ma,R=(L.flags&13878)!=0;if(L.subtreeFlags&13878||R){R=Tt.T,Tt.T=null;var I=Lt.p;Lt.p=2;var B=gn;gn|=4;try{Xd(L,z);var F=Ku,U=Wc(z.containerInfo),V=F.focusedElem,W=F.selectionRange;if(U!==V&&V&&V.ownerDocument&&jc(V.ownerDocument.documentElement,V)){if(W!==null&&Cs(V)){var yt=W.start,Ct=W.end;if(Ct===void 0&&(Ct=yt),"selectionStart"in V)V.selectionStart=yt,V.selectionEnd=Math.min(Ct,V.value.length);else{var zt=V.ownerDocument||document,bt=zt&&zt.defaultView||window;if(bt.getSelection){var wt=bt.getSelection(),jt=V.textContent.length,rn=Math.min(W.start,jt),Cn=W.end===void 0?rn:Math.min(W.end,jt);!wt.extend&&rn>Cn&&(U=Cn,Cn=rn,rn=U);var gt=qc(V,rn),J=qc(V,Cn);if(gt&&J&&(wt.rangeCount!==1||wt.anchorNode!==gt.node||wt.anchorOffset!==gt.offset||wt.focusNode!==J.node||wt.focusOffset!==J.offset)){var vt=zt.createRange();vt.setStart(gt.node,gt.offset),wt.removeAllRanges(),rn>Cn?(wt.addRange(vt),wt.extend(J.node,J.offset)):(vt.setEnd(J.node,J.offset),wt.addRange(vt))}}}}for(zt=[],wt=V;wt=wt.parentNode;)wt.nodeType===1&&zt.push({element:wt,left:wt.scrollLeft,top:wt.scrollTop});for(typeof V.focus=="function"&&V.focus(),V=0;V<zt.length;V++){var Et=zt[V];Et.element.scrollLeft=Et.left,Et.element.scrollTop=Et.top}}Wi=!!Qu,Ku=Qu=null}finally{gn=B,Lt.p=I,Tt.T=R}}z.current=L,Bn=2}}function s0(){if(Bn===2){Bn=0;var z=fl,L=Ma,R=(L.flags&8772)!=0;if(L.subtreeFlags&8772||R){R=Tt.T,Tt.T=null;var I=Lt.p;Lt.p=2;var B=gn;gn|=4;try{Od(z,L.alternate,L)}finally{gn=B,Lt.p=I,Tt.T=R}}Bn=3}}function u0(){if(Bn===4||Bn===3){Bn=0,Bo();var z=fl,L=Ma,R=Wr,I=Wd;L.subtreeFlags&10256||L.flags&10256?Bn=5:(Bn=0,Ma=fl=null,c0(z,z.pendingLanes));var B=z.pendingLanes;if(B===0&&(cl=null),Nl(R),L=L.stateNode,jn&&typeof jn.onCommitFiberRoot=="function")try{jn.onCommitFiberRoot(xl,L,void 0,(L.current.flags&128)==128)}catch{}if(I!==null){L=Tt.T,B=Lt.p,Lt.p=2,Tt.T=null;try{for(var F=z.onRecoverableError,U=0;U<I.length;U++){var V=I[U];F(V.value,{componentStack:V.stack})}}finally{Tt.T=L,Lt.p=B}}Wr&3&&Ii(),Zr(z),B=z.pendingLanes,R&261930&&B&42?z===Fu?Po++:(Po=0,Fu=z):Po=0,To(0,!1)}}function c0(z,L){(z.pooledCacheLanes&=L)===0&&(L=z.pooledCache,L!=null&&(z.pooledCache=null,oo(L)))}function Ii(){return i0(),s0(),u0(),f0()}function f0(){if(Bn!==5)return!1;var z=fl,L=Iu;Iu=0;var R=Nl(Wr),I=Tt.T,B=Lt.p;try{Lt.p=32>R?32:R,Tt.T=null,R=Bu,Bu=null;var F=fl,U=Wr;if(Bn=0,Ma=fl=null,Wr=0,gn&6)throw Error(X(331));var V=gn;if(gn|=4,$d(F.current),Yd(F,F.current,U,R),gn=V,To(0,!1),jn&&typeof jn.onPostCommitFiberRoot=="function")try{jn.onPostCommitFiberRoot(xl,F)}catch{}return!0}finally{Lt.p=B,Tt.T=I,c0(z,L)}}function d0(z,L,R){L=pr(R,L),L=vu(z.stateNode,L,2),z=Hl(z,L,2),z!==null&&(Tl(z,2),Zr(z))}function wn(z,L,R){if(z.tag===3)d0(z,z,R);else for(;L!==null;){if(L.tag===3){d0(L,z,R);break}else if(L.tag===1){var I=L.stateNode;if(typeof L.type.getDerivedStateFromError=="function"||typeof I.componentDidCatch=="function"&&(cl===null||!cl.has(I))){z=pr(R,z),R=pd(2),I=Hl(L,R,2),I!==null&&(hd(R,I,L,z),Tl(I,2),Zr(I));break}}L=L.return}}function Vu(z,L,R){var I=z.pingCache;if(I===null){I=z.pingCache=new uh;var B=new Set;I.set(L,B)}else B=I.get(L),B===void 0&&(B=new Set,I.set(L,B));B.has(R)||(Du=!0,B.add(R),z=hh.bind(null,z,L,R),L.then(z,z))}function hh(z,L,R){var I=z.pingCache;I!==null&&I.delete(L),z.pingedLanes|=z.suspendedLanes&R,z.warmLanes&=~R,En===z&&(fn&R)===R&&(Nn===4||Nn===3&&(fn&62914560)===fn&&300>$n()-Li?!(gn&2)&&_a(z,0):Ru|=R,La===fn&&(La=0)),Zr(z)}function p0(z,L){L===0&&(L=El()),z=Rl(z,L),z!==null&&(Tl(z,L),Zr(z))}function gh(z){var L=z.memoizedState,R=0;L!==null&&(R=L.retryLane),p0(z,R)}function mh(z,L){var R=0;switch(z.tag){case 31:case 13:var I=z.stateNode,B=z.memoizedState;B!==null&&(R=B.retryLane);break;case 19:I=z.stateNode;break;case 22:I=z.stateNode._retryCache;break;default:throw Error(X(314))}I!==null&&I.delete(L),p0(z,R)}function vh(z,L){return Jl(z,L)}var Bi=null,Ra=null,Yu=!1,Fi=!1,Gu=!1,pl=0;function Zr(z){z!==Ra&&z.next===null&&(Ra===null?Bi=Ra=z:Ra=Ra.next=z),Fi=!0,Yu||(Yu=!0,bh())}function To(z,L){if(!Gu&&Fi){Gu=!0;do for(var R=!1,I=Bi;I!==null;){if(!L)if(z!==0){var B=I.pendingLanes;if(B===0)var F=0;else{var U=I.suspendedLanes,V=I.pingedLanes;F=(1<<31-Xn(42|z)+1)-1,F&=B&~(U&~V),F=F&201326741?F&201326741|1:F?F|2:0}F!==0&&(R=!0,v0(I,F))}else F=fn,F=Kr(I,I===En?F:0,I.cancelPendingCommit!==null||I.timeoutHandle!==-1),!(F&3)||cr(I,F)||(R=!0,v0(I,F));I=I.next}while(R);Gu=!1}}function yh(){h0()}function h0(){Fi=Yu=!1;var z=0;pl!==0&&Th()&&(z=pl);for(var L=$n(),R=null,I=Bi;I!==null;){var B=I.next,F=g0(I,L);F===0?(I.next=null,R===null?Bi=B:R.next=B,B===null&&(Ra=R)):(R=I,(z!==0||F&3)&&(Fi=!0)),I=B}Bn!==0&&Bn!==5||To(z,!1),pl!==0&&(pl=0)}function g0(z,L){for(var R=z.suspendedLanes,I=z.pingedLanes,B=z.expirationTimes,F=z.pendingLanes&-62914561;0<F;){var U=31-Xn(F),V=1<<U,W=B[U];W===-1?(!(V&R)||V&I)&&(B[U]=Uo(V,L)):W<=L&&(z.expiredLanes|=V),F&=~V}if(L=En,R=fn,R=Kr(z,z===L?R:0,z.cancelPendingCommit!==null||z.timeoutHandle!==-1),I=z.callbackNode,R===0||z===L&&(bn===2||bn===9)||z.cancelPendingCommit!==null)return I!==null&&I!==null&&Va(I),z.callbackNode=null,z.callbackPriority=0;if(!(R&3)||cr(z,R)){if(L=R&-R,L===z.callbackPriority)return L;switch(I!==null&&Va(I),Nl(R)){case 2:case 8:R=Fo;break;case 32:R=Sl;break;case 268435456:R=Ha;break;default:R=Sl}return I=m0.bind(null,z),R=Jl(R,I),z.callbackPriority=L,z.callbackNode=R,L}return I!==null&&I!==null&&Va(I),z.callbackPriority=2,z.callbackNode=null,2}function m0(z,L){if(Bn!==0&&Bn!==5)return z.callbackNode=null,z.callbackPriority=0,null;var R=z.callbackNode;if(Ii()&&z.callbackNode!==R)return null;var I=fn;return I=Kr(z,z===En?I:0,z.cancelPendingCommit!==null||z.timeoutHandle!==-1),I===0?null:(Qd(z,I,L),g0(z,$n()),z.callbackNode!=null&&z.callbackNode===R?m0.bind(null,z):null)}function v0(z,L){if(Ii())return null;Qd(z,L,!0)}function bh(){Ah(function(){gn&6?Jl(Ga,yh):h0()})}function Hu(){if(pl===0){var z=wa;z===0&&(z=Lr,Lr<<=1,!(Lr&261888)&&(Lr=256)),pl=z}return pl}function y0(z){return z==null||typeof z=="symbol"||typeof z=="boolean"?null:typeof z=="function"?z:qo(""+z)}function b0(z,L){var R=L.ownerDocument.createElement("input");return R.name=L.name,R.value=L.value,z.id&&R.setAttribute("form",z.id),L.parentNode.insertBefore(R,L),z=new FormData(z),R.parentNode.removeChild(R),z}function wh(z,L,R,I,B){if(L==="submit"&&R&&R.stateNode===B){var F=y0((B[qn]||null).action),U=I.submitter;U&&(L=(L=U[qn]||null)?y0(L.formAction):U.getAttribute("formAction"),L!==null&&(F=L,U=null));var V=new Qo("action","action",null,I,B);z.push({event:V,listeners:[{instance:null,listener:function(){if(I.defaultPrevented){if(pl!==0){var W=U?b0(B,U):new FormData(B);fu(R,{pending:!0,data:W,method:B.method,action:F},null,W)}}else typeof F=="function"&&(V.preventDefault(),W=U?b0(B,U):new FormData(B),fu(R,{pending:!0,data:W,method:B.method,action:F},F,W))},currentTarget:B}]})}}for(var $u=0;$u<zs.length;$u++){var qu=zs[$u];Sr(qu.toLowerCase(),"on"+(qu[0].toUpperCase()+qu.slice(1)))}Sr(Kc,"onAnimationEnd"),Sr(Jc,"onAnimationIteration"),Sr(ef,"onAnimationStart"),Sr("dblclick","onDoubleClick"),Sr("focusin","onFocus"),Sr("focusout","onBlur"),Sr(Rp,"onTransitionRun"),Sr(Op,"onTransitionStart"),Sr(Ip,"onTransitionCancel"),Sr(tf,"onTransitionEnd"),oa("onMouseEnter",["mouseout","mouseover"]),oa("onMouseLeave",["mouseout","mouseover"]),oa("onPointerEnter",["pointerout","pointerover"]),oa("onPointerLeave",["pointerout","pointerover"]),Ll("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),Ll("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),Ll("onBeforeInput",["compositionend","keypress","textInput","paste"]),Ll("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),Ll("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),Ll("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var zo="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),kh=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(zo));function w0(z,L){L=(L&4)!=0;for(var R=0;R<z.length;R++){var I=z[R],B=I.event;I=I.listeners;e:{var F=void 0;if(L)for(var U=I.length-1;0<=U;U--){var V=I[U],W=V.instance,yt=V.currentTarget;if(V=V.listener,W!==F&&B.isPropagationStopped())break e;F=V,B.currentTarget=yt;try{F(B)}catch(Ct){ei(Ct)}B.currentTarget=null,F=W}else for(U=0;U<I.length;U++){if(V=I[U],W=V.instance,yt=V.currentTarget,V=V.listener,W!==F&&B.isPropagationStopped())break e;F=V,B.currentTarget=yt;try{F(B)}catch(Ct){ei(Ct)}B.currentTarget=null,F=W}}}}function cn(z,L){var R=L[na];R===void 0&&(R=L[na]=new Set);var I=z+"__bubble";R.has(I)||(S0(L,z,2,!1),R.add(I))}function ju(z,L,R){var I=0;L&&(I|=4),S0(R,z,I,L)}var Ui="_reactListening"+Math.random().toString(36).slice(2);function k0(z){if(!z[Ui]){z[Ui]=!0,mc.forEach(function(R){R!=="selectionchange"&&(kh.has(R)||ju(R,!1,z),ju(R,!0,z))});var L=z.nodeType===9?z:z.ownerDocument;L===null||L[Ui]||(L[Ui]=!0,ju("selectionchange",!1,L))}}function S0(z,L,R,I){switch(W0(L)){case 2:var B=Qh;break;case 8:B=Kh;break;default:B=uc}R=B.bind(null,L,R,z),B=void 0,!gs||L!=="touchstart"&&L!=="touchmove"&&L!=="wheel"||(B=!0),I?B===void 0?z.addEventListener(L,R,!0):z.addEventListener(L,R,{capture:!0,passive:B}):B===void 0?z.addEventListener(L,R,!1):z.addEventListener(L,R,{passive:B})}function Wu(z,L,R,I,B){var F=I;if(!(L&1)&&!(L&2)&&I!==null)e:for(;;){if(I===null)return;var U=I.tag;if(U===3||U===4){var V=I.stateNode.containerInfo;if(V===B)break;if(U===4)for(U=I.return;U!==null;){var W=U.tag;if((W===3||W===4)&&U.stateNode.containerInfo===B)return;U=U.return}for(;V!==null;){if(U=ra(V),U===null)return;if(W=U.tag,W===5||W===6||W===26||W===27){I=F=U;continue e}V=V.parentNode}}I=I.return}zc(function(){var yt=F,Ct=ps(R),zt=[];e:{var bt=nf.get(z);if(bt!==void 0){var wt=Qo,jt=z;switch(z){case"keypress":if(Wo(R)===0)break e;case"keydown":case"keyup":wt=yp;break;case"focusin":jt="focus",wt=bs;break;case"focusout":jt="blur",wt=bs;break;case"beforeblur":case"afterblur":wt=bs;break;case"click":if(R.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":wt=Lc;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":wt=fp;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":wt=bp;break;case Kc:case Jc:case ef:wt=dp;break;case tf:wt=wp;break;case"scroll":case"scrollend":wt=cp;break;case"wheel":wt=kp;break;case"copy":case"cut":case"paste":wt=pp;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":wt=_c;break;case"toggle":case"beforetoggle":wt=Sp}var rn=(L&4)!=0,Cn=!rn&&(z==="scroll"||z==="scrollend"),gt=rn?bt===null?null:bt+"Capture":bt;rn=[];for(var J=yt,vt;J!==null;){var Et=J;if(vt=Et.stateNode,Et=Et.tag,Et!==5&&Et!==26&&Et!==27||vt===null||gt===null||(Et=Wa(J,gt),Et!=null&&rn.push(Ao(J,Et,vt))),Cn)break;J=J.return}0<rn.length&&(bt=new wt(bt,jt,null,R,Ct),zt.push({event:bt,listeners:rn}))}}if(!(L&7)){e:{if(bt=z==="mouseover"||z==="pointerover",wt=z==="mouseout"||z==="pointerout",bt&&R!==ds&&(jt=R.relatedTarget||R.fromElement)&&(ra(jt)||jt[kn]))break e;if((wt||bt)&&(bt=Ct.window===Ct?Ct:(bt=Ct.ownerDocument)?bt.defaultView||bt.parentWindow:window,wt?(jt=R.relatedTarget||R.toElement,wt=yt,jt=jt?ra(jt):null,jt!==null&&(Cn=Z(jt),rn=jt.tag,jt!==Cn||rn!==5&&rn!==27&&rn!==6)&&(jt=null)):(wt=null,jt=yt),wt!==jt)){if(rn=Lc,Et="onMouseLeave",gt="onMouseEnter",J="mouse",(z==="pointerout"||z==="pointerover")&&(rn=_c,Et="onPointerLeave",gt="onPointerEnter",J="pointer"),Cn=wt==null?bt:ja(wt),vt=jt==null?bt:ja(jt),bt=new rn(Et,J+"leave",wt,R,Ct),bt.target=Cn,bt.relatedTarget=vt,Et=null,ra(Ct)===yt&&(rn=new rn(gt,J+"enter",jt,R,Ct),rn.target=vt,rn.relatedTarget=Cn,Et=rn),Cn=Et,wt&&jt)t:{for(rn=Sh,gt=wt,J=jt,vt=0,Et=gt;Et;Et=rn(Et))vt++;Et=0;for(var en=J;en;en=rn(en))Et++;for(;0<vt-Et;)gt=rn(gt),vt--;for(;0<Et-vt;)J=rn(J),Et--;for(;vt--;){if(gt===J||J!==null&&gt===J.alternate){rn=gt;break t}gt=rn(gt),J=rn(J)}rn=null}else rn=null;wt!==null&&x0(zt,bt,wt,rn,!1),jt!==null&&Cn!==null&&x0(zt,Cn,jt,rn,!0)}}e:{if(bt=yt?ja(yt):window,wt=bt.nodeName&&bt.nodeName.toLowerCase(),wt==="select"||wt==="input"&&bt.type==="file")var mn=Xc;else if(Fc(bt))if(Vc)mn=Mp;else{mn=Np;var Zt=Ap}else wt=bt.nodeName,!wt||wt.toLowerCase()!=="input"||bt.type!=="checkbox"&&bt.type!=="radio"?yt&&fs(yt.elementType)&&(mn=Xc):mn=Lp;if(mn&&(mn=mn(z,yt))){Uc(zt,mn,R,Ct);break e}Zt&&Zt(z,bt,yt),z==="focusout"&&yt&&bt.type==="number"&&yt.memoizedProps.value!=null&&cs(bt,"number",bt.value)}switch(Zt=yt?ja(yt):window,z){case"focusin":(Fc(Zt)||Zt.contentEditable==="true")&&(da=Zt,Es=yt,ro=null);break;case"focusout":ro=Es=da=null;break;case"mousedown":Ps=!0;break;case"contextmenu":case"mouseup":case"dragend":Ps=!1,Zc(zt,R,Ct);break;case"selectionchange":if(Dp)break;case"keydown":case"keyup":Zc(zt,R,Ct)}var on;if(ks)e:{switch(z){case"compositionstart":var dn="onCompositionStart";break e;case"compositionend":dn="onCompositionEnd";break e;case"compositionupdate":dn="onCompositionUpdate";break e}dn=void 0}else fa?Ic(z,R)&&(dn="onCompositionEnd"):z==="keydown"&&R.keyCode===229&&(dn="onCompositionStart");dn&&(Dc&&R.locale!=="ko"&&(fa||dn!=="onCompositionStart"?dn==="onCompositionEnd"&&fa&&(on=Ac()):(Jr=Ct,ms="value"in Jr?Jr.value:Jr.textContent,fa=!0)),Zt=Xi(yt,dn),0<Zt.length&&(dn=new Mc(dn,z,null,R,Ct),zt.push({event:dn,listeners:Zt}),on?dn.data=on:(on=Bc(R),on!==null&&(dn.data=on)))),(on=Cp?Ep(z,R):Pp(z,R))&&(dn=Xi(yt,"onBeforeInput"),0<dn.length&&(Zt=new Mc("onBeforeInput","beforeinput",null,R,Ct),zt.push({event:Zt,listeners:dn}),Zt.data=on)),wh(zt,z,yt,R,Ct)}w0(zt,L)})}function Ao(z,L,R){return{instance:z,listener:L,currentTarget:R}}function Xi(z,L){for(var R=L+"Capture",I=[];z!==null;){var B=z,F=B.stateNode;if(B=B.tag,B!==5&&B!==26&&B!==27||F===null||(B=Wa(z,R),B!=null&&I.unshift(Ao(z,B,F)),B=Wa(z,L),B!=null&&I.push(Ao(z,B,F))),z.tag===3)return I;z=z.return}return[]}function Sh(z){if(z===null)return null;do z=z.return;while(z&&z.tag!==5&&z.tag!==27);return z||null}function x0(z,L,R,I,B){for(var F=L._reactName,U=[];R!==null&&R!==I;){var V=R,W=V.alternate,yt=V.stateNode;if(V=V.tag,W!==null&&W===I)break;V!==5&&V!==26&&V!==27||yt===null||(W=yt,B?(yt=Wa(R,F),yt!=null&&U.unshift(Ao(R,yt,W))):B||(yt=Wa(R,F),yt!=null&&U.push(Ao(R,yt,W)))),R=R.return}U.length!==0&&z.push({event:L,listeners:U})}var xh=/\r\n?/g,Ch=/\u0000|\uFFFD/g;function C0(z){return(typeof z=="string"?z:""+z).replace(xh,`
`).replace(Ch,"")}function E0(z,L){return L=C0(L),C0(z)===L}function xn(z,L,R,I,B,F){switch(R){case"children":typeof I=="string"?L==="body"||L==="textarea"&&I===""||sa(z,I):(typeof I=="number"||typeof I=="bigint")&&L!=="body"&&sa(z,""+I);break;case"className":Ho(z,"class",I);break;case"tabIndex":Ho(z,"tabindex",I);break;case"dir":case"role":case"viewBox":case"width":case"height":Ho(z,R,I);break;case"style":Pc(z,I,F);break;case"data":if(L!=="object"){Ho(z,"data",I);break}case"src":case"href":if(I===""&&(L!=="a"||R!=="href")){z.removeAttribute(R);break}if(I==null||typeof I=="function"||typeof I=="symbol"||typeof I=="boolean"){z.removeAttribute(R);break}I=qo(""+I),z.setAttribute(R,I);break;case"action":case"formAction":if(typeof I=="function"){z.setAttribute(R,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof F=="function"&&(R==="formAction"?(L!=="input"&&xn(z,L,"name",B.name,B,null),xn(z,L,"formEncType",B.formEncType,B,null),xn(z,L,"formMethod",B.formMethod,B,null),xn(z,L,"formTarget",B.formTarget,B,null)):(xn(z,L,"encType",B.encType,B,null),xn(z,L,"method",B.method,B,null),xn(z,L,"target",B.target,B,null)));if(I==null||typeof I=="symbol"||typeof I=="boolean"){z.removeAttribute(R);break}I=qo(""+I),z.setAttribute(R,I);break;case"onClick":I!=null&&(z.onclick=Dr);break;case"onScroll":I!=null&&cn("scroll",z);break;case"onScrollEnd":I!=null&&cn("scrollend",z);break;case"dangerouslySetInnerHTML":if(I!=null){if(typeof I!="object"||!("__html"in I))throw Error(X(61));if(R=I.__html,R!=null){if(B.children!=null)throw Error(X(60));z.innerHTML=R}}break;case"multiple":z.multiple=I&&typeof I!="function"&&typeof I!="symbol";break;case"muted":z.muted=I&&typeof I!="function"&&typeof I!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(I==null||typeof I=="function"||typeof I=="boolean"||typeof I=="symbol"){z.removeAttribute("xlink:href");break}R=qo(""+I),z.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",R);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":I!=null&&typeof I!="function"&&typeof I!="symbol"?z.setAttribute(R,""+I):z.removeAttribute(R);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":I&&typeof I!="function"&&typeof I!="symbol"?z.setAttribute(R,""):z.removeAttribute(R);break;case"capture":case"download":I===!0?z.setAttribute(R,""):I!==!1&&I!=null&&typeof I!="function"&&typeof I!="symbol"?z.setAttribute(R,I):z.removeAttribute(R);break;case"cols":case"rows":case"size":case"span":I!=null&&typeof I!="function"&&typeof I!="symbol"&&!isNaN(I)&&1<=I?z.setAttribute(R,I):z.removeAttribute(R);break;case"rowSpan":case"start":I==null||typeof I=="function"||typeof I=="symbol"||isNaN(I)?z.removeAttribute(R):z.setAttribute(R,I);break;case"popover":cn("beforetoggle",z),cn("toggle",z),Go(z,"popover",I);break;case"xlinkActuate":_r(z,"http://www.w3.org/1999/xlink","xlink:actuate",I);break;case"xlinkArcrole":_r(z,"http://www.w3.org/1999/xlink","xlink:arcrole",I);break;case"xlinkRole":_r(z,"http://www.w3.org/1999/xlink","xlink:role",I);break;case"xlinkShow":_r(z,"http://www.w3.org/1999/xlink","xlink:show",I);break;case"xlinkTitle":_r(z,"http://www.w3.org/1999/xlink","xlink:title",I);break;case"xlinkType":_r(z,"http://www.w3.org/1999/xlink","xlink:type",I);break;case"xmlBase":_r(z,"http://www.w3.org/XML/1998/namespace","xml:base",I);break;case"xmlLang":_r(z,"http://www.w3.org/XML/1998/namespace","xml:lang",I);break;case"xmlSpace":_r(z,"http://www.w3.org/XML/1998/namespace","xml:space",I);break;case"is":Go(z,"is",I);break;case"innerText":case"textContent":break;default:(!(2<R.length)||R[0]!=="o"&&R[0]!=="O"||R[1]!=="n"&&R[1]!=="N")&&(R=sp.get(R)||R,Go(z,R,I))}}function Zu(z,L,R,I,B,F){switch(R){case"style":Pc(z,I,F);break;case"dangerouslySetInnerHTML":if(I!=null){if(typeof I!="object"||!("__html"in I))throw Error(X(61));if(R=I.__html,R!=null){if(B.children!=null)throw Error(X(60));z.innerHTML=R}}break;case"children":typeof I=="string"?sa(z,I):(typeof I=="number"||typeof I=="bigint")&&sa(z,""+I);break;case"onScroll":I!=null&&cn("scroll",z);break;case"onScrollEnd":I!=null&&cn("scrollend",z);break;case"onClick":I!=null&&(z.onclick=Dr);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!vc.hasOwnProperty(R))e:{if(R[0]==="o"&&R[1]==="n"&&(B=R.endsWith("Capture"),L=R.slice(2,B?R.length-7:void 0),F=z[qn]||null,F=F==null?null:F[R],typeof F=="function"&&z.removeEventListener(L,F,B),typeof I=="function")){typeof F!="function"&&F!==null&&(R in z?z[R]=null:z.hasAttribute(R)&&z.removeAttribute(R)),z.addEventListener(L,I,B);break e}R in z?z[R]=I:I===!0?z.setAttribute(R,""):Go(z,R,I)}}}function Hn(z,L,R){switch(L){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":cn("error",z),cn("load",z);var I=!1,B=!1,F;for(F in R)if(R.hasOwnProperty(F)){var U=R[F];if(U!=null)switch(F){case"src":I=!0;break;case"srcSet":B=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(X(137,L));default:xn(z,L,F,U,R,null)}}B&&xn(z,L,"srcSet",R.srcSet,R,null),I&&xn(z,L,"src",R.src,R,null);return;case"input":cn("invalid",z);var V=F=U=B=null,W=null,yt=null;for(I in R)if(R.hasOwnProperty(I)){var Ct=R[I];if(Ct!=null)switch(I){case"name":B=Ct;break;case"type":U=Ct;break;case"checked":W=Ct;break;case"defaultChecked":yt=Ct;break;case"value":F=Ct;break;case"defaultValue":V=Ct;break;case"children":case"dangerouslySetInnerHTML":if(Ct!=null)throw Error(X(137,L));break;default:xn(z,L,I,Ct,R,null)}}Sc(z,F,V,W,yt,U,B,!1);return;case"select":for(B in cn("invalid",z),I=U=F=null,R)if(R.hasOwnProperty(B)&&(V=R[B],V!=null))switch(B){case"value":F=V;break;case"defaultValue":U=V;break;case"multiple":I=V;default:xn(z,L,B,V,R,null)}L=F,R=U,z.multiple=!!I,L==null?R!=null&&ia(z,!!I,R,!0):ia(z,!!I,L,!1);return;case"textarea":for(U in cn("invalid",z),F=B=I=null,R)if(R.hasOwnProperty(U)&&(V=R[U],V!=null))switch(U){case"value":I=V;break;case"defaultValue":B=V;break;case"children":F=V;break;case"dangerouslySetInnerHTML":if(V!=null)throw Error(X(91));break;default:xn(z,L,U,V,R,null)}Cc(z,I,B,F);return;case"option":for(W in R)if(R.hasOwnProperty(W)&&(I=R[W],I!=null))switch(W){case"selected":z.selected=I&&typeof I!="function"&&typeof I!="symbol";break;default:xn(z,L,W,I,R,null)}return;case"dialog":cn("beforetoggle",z),cn("toggle",z),cn("cancel",z),cn("close",z);break;case"iframe":case"object":cn("load",z);break;case"video":case"audio":for(I=0;I<zo.length;I++)cn(zo[I],z);break;case"image":cn("error",z),cn("load",z);break;case"details":cn("toggle",z);break;case"embed":case"source":case"link":cn("error",z),cn("load",z);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(yt in R)if(R.hasOwnProperty(yt)&&(I=R[yt],I!=null))switch(yt){case"children":case"dangerouslySetInnerHTML":throw Error(X(137,L));default:xn(z,L,yt,I,R,null)}return;default:if(fs(L)){for(Ct in R)R.hasOwnProperty(Ct)&&(I=R[Ct],I!==void 0&&Zu(z,L,Ct,I,R,void 0));return}}for(V in R)R.hasOwnProperty(V)&&(I=R[V],I!=null&&xn(z,L,V,I,R,null))}function Eh(z,L,R,I){switch(L){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var B=null,F=null,U=null,V=null,W=null,yt=null,Ct=null;for(wt in R){var zt=R[wt];if(R.hasOwnProperty(wt)&&zt!=null)switch(wt){case"checked":break;case"value":break;case"defaultValue":W=zt;default:I.hasOwnProperty(wt)||xn(z,L,wt,null,I,zt)}}for(var bt in I){var wt=I[bt];if(zt=R[bt],I.hasOwnProperty(bt)&&(wt!=null||zt!=null))switch(bt){case"type":F=wt;break;case"name":B=wt;break;case"checked":yt=wt;break;case"defaultChecked":Ct=wt;break;case"value":U=wt;break;case"defaultValue":V=wt;break;case"children":case"dangerouslySetInnerHTML":if(wt!=null)throw Error(X(137,L));break;default:wt!==zt&&xn(z,L,bt,wt,I,zt)}}us(z,U,V,W,yt,Ct,F,B);return;case"select":for(F in wt=U=V=bt=null,R)if(W=R[F],R.hasOwnProperty(F)&&W!=null)switch(F){case"value":break;case"multiple":wt=W;default:I.hasOwnProperty(F)||xn(z,L,F,null,I,W)}for(B in I)if(F=I[B],W=R[B],I.hasOwnProperty(B)&&(F!=null||W!=null))switch(B){case"value":bt=F;break;case"defaultValue":V=F;break;case"multiple":U=F;default:F!==W&&xn(z,L,B,F,I,W)}L=V,R=U,I=wt,bt==null?!!I!=!!R&&(L==null?ia(z,!!R,R?[]:"",!1):ia(z,!!R,L,!0)):ia(z,!!R,bt,!1);return;case"textarea":for(V in wt=bt=null,R)if(B=R[V],R.hasOwnProperty(V)&&B!=null&&!I.hasOwnProperty(V))switch(V){case"value":break;case"children":break;default:xn(z,L,V,null,I,B)}for(U in I)if(B=I[U],F=R[U],I.hasOwnProperty(U)&&(B!=null||F!=null))switch(U){case"value":bt=B;break;case"defaultValue":wt=B;break;case"children":break;case"dangerouslySetInnerHTML":if(B!=null)throw Error(X(91));break;default:B!==F&&xn(z,L,U,B,I,F)}xc(z,bt,wt);return;case"option":for(var jt in R)if(bt=R[jt],R.hasOwnProperty(jt)&&bt!=null&&!I.hasOwnProperty(jt))switch(jt){case"selected":z.selected=!1;break;default:xn(z,L,jt,null,I,bt)}for(W in I)if(bt=I[W],wt=R[W],I.hasOwnProperty(W)&&bt!==wt&&(bt!=null||wt!=null))switch(W){case"selected":z.selected=bt&&typeof bt!="function"&&typeof bt!="symbol";break;default:xn(z,L,W,bt,I,wt)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var rn in R)bt=R[rn],R.hasOwnProperty(rn)&&bt!=null&&!I.hasOwnProperty(rn)&&xn(z,L,rn,null,I,bt);for(yt in I)if(bt=I[yt],wt=R[yt],I.hasOwnProperty(yt)&&bt!==wt&&(bt!=null||wt!=null))switch(yt){case"children":case"dangerouslySetInnerHTML":if(bt!=null)throw Error(X(137,L));break;default:xn(z,L,yt,bt,I,wt)}return;default:if(fs(L)){for(var Cn in R)bt=R[Cn],R.hasOwnProperty(Cn)&&bt!==void 0&&!I.hasOwnProperty(Cn)&&Zu(z,L,Cn,void 0,I,bt);for(Ct in I)bt=I[Ct],wt=R[Ct],!I.hasOwnProperty(Ct)||bt===wt||bt===void 0&&wt===void 0||Zu(z,L,Ct,bt,I,wt);return}}for(var gt in R)bt=R[gt],R.hasOwnProperty(gt)&&bt!=null&&!I.hasOwnProperty(gt)&&xn(z,L,gt,null,I,bt);for(zt in I)bt=I[zt],wt=R[zt],!I.hasOwnProperty(zt)||bt===wt||bt==null&&wt==null||xn(z,L,zt,bt,I,wt)}function P0(z){switch(z){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function Ph(){if(typeof performance.getEntriesByType=="function"){for(var z=0,L=0,R=performance.getEntriesByType("resource"),I=0;I<R.length;I++){var B=R[I],F=B.transferSize,U=B.initiatorType,V=B.duration;if(F&&V&&P0(U)){for(U=0,V=B.responseEnd,I+=1;I<R.length;I++){var W=R[I],yt=W.startTime;if(yt>V)break;var Ct=W.transferSize,zt=W.initiatorType;Ct&&P0(zt)&&(W=W.responseEnd,U+=Ct*(W<V?1:(V-yt)/(W-yt)))}if(--I,L+=8*(F+U)/(B.duration/1e3),z++,10<z)break}}if(0<z)return L/z/1e6}return navigator.connection&&(z=navigator.connection.downlink,typeof z=="number")?z:5}var Qu=null,Ku=null;function Vi(z){return z.nodeType===9?z:z.ownerDocument}function T0(z){switch(z){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function z0(z,L){if(z===0)switch(L){case"svg":return 1;case"math":return 2;default:return 0}return z===1&&L==="foreignObject"?0:z}function Ju(z,L){return z==="textarea"||z==="noscript"||typeof L.children=="string"||typeof L.children=="number"||typeof L.children=="bigint"||typeof L.dangerouslySetInnerHTML=="object"&&L.dangerouslySetInnerHTML!==null&&L.dangerouslySetInnerHTML.__html!=null}var ec=null;function Th(){var z=window.event;return z&&z.type==="popstate"?z===ec?!1:(ec=z,!0):(ec=null,!1)}var A0=typeof setTimeout=="function"?setTimeout:void 0,zh=typeof clearTimeout=="function"?clearTimeout:void 0,N0=typeof Promise=="function"?Promise:void 0,Ah=typeof queueMicrotask=="function"?queueMicrotask:N0===void 0?A0:function(z){return N0.resolve(null).then(z).catch(Nh)};function Nh(z){setTimeout(function(){throw z})}function hl(z){return z==="head"}function L0(z,L){var R=L,I=0;do{var B=R.nextSibling;if(z.removeChild(R),B&&B.nodeType===8)if(R=B.data,R==="/$"||R==="/&"){if(I===0){z.removeChild(B),Fa(L);return}I--}else if(R==="$"||R==="$?"||R==="$~"||R==="$!"||R==="&")I++;else if(R==="html")No(z.ownerDocument.documentElement);else if(R==="head"){R=z.ownerDocument.head,No(R);for(var F=R.firstChild;F;){var U=F.nextSibling,V=F.nodeName;F[qa]||V==="SCRIPT"||V==="STYLE"||V==="LINK"&&F.rel.toLowerCase()==="stylesheet"||R.removeChild(F),F=U}}else R==="body"&&No(z.ownerDocument.body);R=B}while(R);Fa(L)}function M0(z,L){var R=z;z=0;do{var I=R.nextSibling;if(R.nodeType===1?L?(R._stashedDisplay=R.style.display,R.style.display="none"):(R.style.display=R._stashedDisplay||"",R.getAttribute("style")===""&&R.removeAttribute("style")):R.nodeType===3&&(L?(R._stashedText=R.nodeValue,R.nodeValue=""):R.nodeValue=R._stashedText||""),I&&I.nodeType===8)if(R=I.data,R==="/$"){if(z===0)break;z--}else R!=="$"&&R!=="$?"&&R!=="$~"&&R!=="$!"||z++;R=I}while(R)}function tc(z){var L=z.firstChild;for(L&&L.nodeType===10&&(L=L.nextSibling);L;){var R=L;switch(L=L.nextSibling,R.nodeName){case"HTML":case"HEAD":case"BODY":tc(R),is(R);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(R.rel.toLowerCase()==="stylesheet")continue}z.removeChild(R)}}function Lh(z,L,R,I){for(;z.nodeType===1;){var B=R;if(z.nodeName.toLowerCase()!==L.toLowerCase()){if(!I&&(z.nodeName!=="INPUT"||z.type!=="hidden"))break}else if(I){if(!z[qa])switch(L){case"meta":if(!z.hasAttribute("itemprop"))break;return z;case"link":if(F=z.getAttribute("rel"),F==="stylesheet"&&z.hasAttribute("data-precedence")||F!==B.rel||z.getAttribute("href")!==(B.href==null||B.href===""?null:B.href)||z.getAttribute("crossorigin")!==(B.crossOrigin==null?null:B.crossOrigin)||z.getAttribute("title")!==(B.title==null?null:B.title))break;return z;case"style":if(z.hasAttribute("data-precedence"))break;return z;case"script":if(F=z.getAttribute("src"),(F!==(B.src==null?null:B.src)||z.getAttribute("type")!==(B.type==null?null:B.type)||z.getAttribute("crossorigin")!==(B.crossOrigin==null?null:B.crossOrigin))&&F&&z.hasAttribute("async")&&!z.hasAttribute("itemprop"))break;return z;default:return z}}else if(L==="input"&&z.type==="hidden"){var F=B.name==null?null:""+B.name;if(B.type==="hidden"&&z.getAttribute("name")===F)return z}else return z;if(z=yr(z.nextSibling),z===null)break}return null}function Mh(z,L,R){if(L==="")return null;for(;z.nodeType!==3;)if((z.nodeType!==1||z.nodeName!=="INPUT"||z.type!=="hidden")&&!R||(z=yr(z.nextSibling),z===null))return null;return z}function _0(z,L){for(;z.nodeType!==8;)if((z.nodeType!==1||z.nodeName!=="INPUT"||z.type!=="hidden")&&!L||(z=yr(z.nextSibling),z===null))return null;return z}function nc(z){return z.data==="$?"||z.data==="$~"}function rc(z){return z.data==="$!"||z.data==="$?"&&z.ownerDocument.readyState!=="loading"}function _h(z,L){var R=z.ownerDocument;if(z.data==="$~")z._reactRetry=L;else if(z.data!=="$?"||R.readyState!=="loading")L();else{var I=function(){L(),R.removeEventListener("DOMContentLoaded",I)};R.addEventListener("DOMContentLoaded",I),z._reactRetry=I}}function yr(z){for(;z!=null;z=z.nextSibling){var L=z.nodeType;if(L===1||L===3)break;if(L===8){if(L=z.data,L==="$"||L==="$!"||L==="$?"||L==="$~"||L==="&"||L==="F!"||L==="F")break;if(L==="/$"||L==="/&")return null}}return z}var lc=null;function D0(z){z=z.nextSibling;for(var L=0;z;){if(z.nodeType===8){var R=z.data;if(R==="/$"||R==="/&"){if(L===0)return yr(z.nextSibling);L--}else R!=="$"&&R!=="$!"&&R!=="$?"&&R!=="$~"&&R!=="&"||L++}z=z.nextSibling}return null}function R0(z){z=z.previousSibling;for(var L=0;z;){if(z.nodeType===8){var R=z.data;if(R==="$"||R==="$!"||R==="$?"||R==="$~"||R==="&"){if(L===0)return z;L--}else R!=="/$"&&R!=="/&"||L++}z=z.previousSibling}return null}function O0(z,L,R){switch(L=Vi(R),z){case"html":if(z=L.documentElement,!z)throw Error(X(452));return z;case"head":if(z=L.head,!z)throw Error(X(453));return z;case"body":if(z=L.body,!z)throw Error(X(454));return z;default:throw Error(X(451))}}function No(z){for(var L=z.attributes;L.length;)z.removeAttributeNode(L[0]);is(z)}var br=new Map,I0=new Set;function Yi(z){return typeof z.getRootNode=="function"?z.getRootNode():z.nodeType===9?z:z.ownerDocument}var Qr=Lt.d;Lt.d={f:Dh,r:Rh,D:Oh,C:Ih,L:Bh,m:Fh,X:Xh,S:Uh,M:Vh};function Dh(){var z=Qr.f(),L=Di();return z||L}function Rh(z){var L=la(z);L!==null&&L.tag===5&&L.type==="form"?nd(L):Qr.r(z)}var Oa=typeof document>"u"?null:document;function B0(z,L,R){var I=Oa;if(I&&typeof L=="string"&&L){var B=kr(L);B='link[rel="'+z+'"][href="'+B+'"]',typeof R=="string"&&(B+='[crossorigin="'+R+'"]'),I0.has(B)||(I0.add(B),z={rel:z,crossOrigin:R,href:L},I.querySelector(B)===null&&(L=I.createElement("link"),Hn(L,"link",z),Fn(L),I.head.appendChild(L)))}}function Oh(z){Qr.D(z),B0("dns-prefetch",z,null)}function Ih(z,L){Qr.C(z,L),B0("preconnect",z,L)}function Bh(z,L,R){Qr.L(z,L,R);var I=Oa;if(I&&z&&L){var B='link[rel="preload"][as="'+kr(L)+'"]';L==="image"&&R&&R.imageSrcSet?(B+='[imagesrcset="'+kr(R.imageSrcSet)+'"]',typeof R.imageSizes=="string"&&(B+='[imagesizes="'+kr(R.imageSizes)+'"]')):B+='[href="'+kr(z)+'"]';var F=B;switch(L){case"style":F=Ia(z);break;case"script":F=Ba(z)}br.has(F)||(z=mt({rel:"preload",href:L==="image"&&R&&R.imageSrcSet?void 0:z,as:L},R),br.set(F,z),I.querySelector(B)!==null||L==="style"&&I.querySelector(Lo(F))||L==="script"&&I.querySelector(Mo(F))||(L=I.createElement("link"),Hn(L,"link",z),Fn(L),I.head.appendChild(L)))}}function Fh(z,L){Qr.m(z,L);var R=Oa;if(R&&z){var I=L&&typeof L.as=="string"?L.as:"script",B='link[rel="modulepreload"][as="'+kr(I)+'"][href="'+kr(z)+'"]',F=B;switch(I){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":F=Ba(z)}if(!br.has(F)&&(z=mt({rel:"modulepreload",href:z},L),br.set(F,z),R.querySelector(B)===null)){switch(I){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(R.querySelector(Mo(F)))return}I=R.createElement("link"),Hn(I,"link",z),Fn(I),R.head.appendChild(I)}}}function Uh(z,L,R){Qr.S(z,L,R);var I=Oa;if(I&&z){var B=aa(I).hoistableStyles,F=Ia(z);L||(L="default");var U=B.get(F);if(!U){var V={loading:0,preload:null};if(U=I.querySelector(Lo(F)))V.loading=5;else{z=mt({rel:"stylesheet",href:z,"data-precedence":L},R),(R=br.get(F))&&ac(z,R);var W=U=I.createElement("link");Fn(W),Hn(W,"link",z),W._p=new Promise(function(yt,Ct){W.onload=yt,W.onerror=Ct}),W.addEventListener("load",function(){V.loading|=1}),W.addEventListener("error",function(){V.loading|=2}),V.loading|=4,Gi(U,L,I)}U={type:"stylesheet",instance:U,count:1,state:V},B.set(F,U)}}}function Xh(z,L){Qr.X(z,L);var R=Oa;if(R&&z){var I=aa(R).hoistableScripts,B=Ba(z),F=I.get(B);F||(F=R.querySelector(Mo(B)),F||(z=mt({src:z,async:!0},L),(L=br.get(B))&&oc(z,L),F=R.createElement("script"),Fn(F),Hn(F,"link",z),R.head.appendChild(F)),F={type:"script",instance:F,count:1,state:null},I.set(B,F))}}function Vh(z,L){Qr.M(z,L);var R=Oa;if(R&&z){var I=aa(R).hoistableScripts,B=Ba(z),F=I.get(B);F||(F=R.querySelector(Mo(B)),F||(z=mt({src:z,async:!0,type:"module"},L),(L=br.get(B))&&oc(z,L),F=R.createElement("script"),Fn(F),Hn(F,"link",z),R.head.appendChild(F)),F={type:"script",instance:F,count:1,state:null},I.set(B,F))}}function F0(z,L,R,I){var B=(B=Wt.current)?Yi(B):null;if(!B)throw Error(X(446));switch(z){case"meta":case"title":return null;case"style":return typeof R.precedence=="string"&&typeof R.href=="string"?(L=Ia(R.href),R=aa(B).hoistableStyles,I=R.get(L),I||(I={type:"style",instance:null,count:0,state:null},R.set(L,I)),I):{type:"void",instance:null,count:0,state:null};case"link":if(R.rel==="stylesheet"&&typeof R.href=="string"&&typeof R.precedence=="string"){z=Ia(R.href);var F=aa(B).hoistableStyles,U=F.get(z);if(U||(B=B.ownerDocument||B,U={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},F.set(z,U),(F=B.querySelector(Lo(z)))&&!F._p&&(U.instance=F,U.state.loading=5),br.has(z)||(R={rel:"preload",as:"style",href:R.href,crossOrigin:R.crossOrigin,integrity:R.integrity,media:R.media,hrefLang:R.hrefLang,referrerPolicy:R.referrerPolicy},br.set(z,R),F||Yh(B,z,R,U.state))),L&&I===null)throw Error(X(528,""));return U}if(L&&I!==null)throw Error(X(529,""));return null;case"script":return L=R.async,R=R.src,typeof R=="string"&&L&&typeof L!="function"&&typeof L!="symbol"?(L=Ba(R),R=aa(B).hoistableScripts,I=R.get(L),I||(I={type:"script",instance:null,count:0,state:null},R.set(L,I)),I):{type:"void",instance:null,count:0,state:null};default:throw Error(X(444,z))}}function Ia(z){return'href="'+kr(z)+'"'}function Lo(z){return'link[rel="stylesheet"]['+z+"]"}function U0(z){return mt({},z,{"data-precedence":z.precedence,precedence:null})}function Yh(z,L,R,I){z.querySelector('link[rel="preload"][as="style"]['+L+"]")?I.loading=1:(L=z.createElement("link"),I.preload=L,L.addEventListener("load",function(){return I.loading|=1}),L.addEventListener("error",function(){return I.loading|=2}),Hn(L,"link",R),Fn(L),z.head.appendChild(L))}function Ba(z){return'[src="'+kr(z)+'"]'}function Mo(z){return"script[async]"+z}function X0(z,L,R){if(L.count++,L.instance===null)switch(L.type){case"style":var I=z.querySelector('style[data-href~="'+kr(R.href)+'"]');if(I)return L.instance=I,Fn(I),I;var B=mt({},R,{"data-href":R.href,"data-precedence":R.precedence,href:null,precedence:null});return I=(z.ownerDocument||z).createElement("style"),Fn(I),Hn(I,"style",B),Gi(I,R.precedence,z),L.instance=I;case"stylesheet":B=Ia(R.href);var F=z.querySelector(Lo(B));if(F)return L.state.loading|=4,L.instance=F,Fn(F),F;I=U0(R),(B=br.get(B))&&ac(I,B),F=(z.ownerDocument||z).createElement("link"),Fn(F);var U=F;return U._p=new Promise(function(V,W){U.onload=V,U.onerror=W}),Hn(F,"link",I),L.state.loading|=4,Gi(F,R.precedence,z),L.instance=F;case"script":return F=Ba(R.src),(B=z.querySelector(Mo(F)))?(L.instance=B,Fn(B),B):(I=R,(B=br.get(F))&&(I=mt({},R),oc(I,B)),z=z.ownerDocument||z,B=z.createElement("script"),Fn(B),Hn(B,"link",I),z.head.appendChild(B),L.instance=B);case"void":return null;default:throw Error(X(443,L.type))}else L.type==="stylesheet"&&!(L.state.loading&4)&&(I=L.instance,L.state.loading|=4,Gi(I,R.precedence,z));return L.instance}function Gi(z,L,R){for(var I=R.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),B=I.length?I[I.length-1]:null,F=B,U=0;U<I.length;U++){var V=I[U];if(V.dataset.precedence===L)F=V;else if(F!==B)break}F?F.parentNode.insertBefore(z,F.nextSibling):(L=R.nodeType===9?R.head:R,L.insertBefore(z,L.firstChild))}function ac(z,L){z.crossOrigin??(z.crossOrigin=L.crossOrigin),z.referrerPolicy??(z.referrerPolicy=L.referrerPolicy),z.title??(z.title=L.title)}function oc(z,L){z.crossOrigin??(z.crossOrigin=L.crossOrigin),z.referrerPolicy??(z.referrerPolicy=L.referrerPolicy),z.integrity??(z.integrity=L.integrity)}var Hi=null;function V0(z,L,R){if(Hi===null){var I=new Map,B=Hi=new Map;B.set(R,I)}else B=Hi,I=B.get(R),I||(I=new Map,B.set(R,I));if(I.has(z))return I;for(I.set(z,null),R=R.getElementsByTagName(z),B=0;B<R.length;B++){var F=R[B];if(!(F[qa]||F[_n]||z==="link"&&F.getAttribute("rel")==="stylesheet")&&F.namespaceURI!=="http://www.w3.org/2000/svg"){var U=F.getAttribute(L)||"";U=z+U;var V=I.get(U);V?V.push(F):I.set(U,[F])}}return I}function Y0(z,L,R){z=z.ownerDocument||z,z.head.insertBefore(R,L==="title"?z.querySelector("head > title"):null)}function Gh(z,L,R){if(R===1||L.itemProp!=null)return!1;switch(z){case"meta":case"title":return!0;case"style":if(typeof L.precedence!="string"||typeof L.href!="string"||L.href==="")break;return!0;case"link":if(typeof L.rel!="string"||typeof L.href!="string"||L.href===""||L.onLoad||L.onError)break;switch(L.rel){case"stylesheet":return z=L.disabled,typeof L.precedence=="string"&&z==null;default:return!0}case"script":if(L.async&&typeof L.async!="function"&&typeof L.async!="symbol"&&!L.onLoad&&!L.onError&&L.src&&typeof L.src=="string")return!0}return!1}function G0(z){return!(z.type==="stylesheet"&&!(z.state.loading&3))}function Hh(z,L,R,I){if(R.type==="stylesheet"&&(typeof I.media!="string"||matchMedia(I.media).matches!==!1)&&!(R.state.loading&4)){if(R.instance===null){var B=Ia(I.href),F=L.querySelector(Lo(B));if(F){L=F._p,typeof L=="object"&&L&&typeof L.then=="function"&&(z.count++,z=$i.bind(z),L.then(z,z)),R.state.loading|=4,R.instance=F,Fn(F);return}F=L.ownerDocument||L,I=U0(I),(B=br.get(B))&&ac(I,B),F=F.createElement("link"),Fn(F);var U=F;U._p=new Promise(function(V,W){U.onload=V,U.onerror=W}),Hn(F,"link",I),R.instance=F}z.stylesheets===null&&(z.stylesheets=new Map),z.stylesheets.set(R,L),(L=R.state.preload)&&!(R.state.loading&3)&&(z.count++,R=$i.bind(z),L.addEventListener("load",R),L.addEventListener("error",R))}}var ic=0;function $h(z,L){return z.stylesheets&&z.count===0&&ji(z,z.stylesheets),0<z.count||0<z.imgCount?function(R){var I=setTimeout(function(){if(z.stylesheets&&ji(z,z.stylesheets),z.unsuspend){var F=z.unsuspend;z.unsuspend=null,F()}},6e4+L);0<z.imgBytes&&ic===0&&(ic=62500*Ph());var B=setTimeout(function(){if(z.waitingForImages=!1,z.count===0&&(z.stylesheets&&ji(z,z.stylesheets),z.unsuspend)){var F=z.unsuspend;z.unsuspend=null,F()}},(z.imgBytes>ic?50:800)+L);return z.unsuspend=R,function(){z.unsuspend=null,clearTimeout(I),clearTimeout(B)}}:null}function $i(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)ji(this,this.stylesheets);else if(this.unsuspend){var z=this.unsuspend;this.unsuspend=null,z()}}}var qi=null;function ji(z,L){z.stylesheets=null,z.unsuspend!==null&&(z.count++,qi=new Map,L.forEach(qh,z),qi=null,$i.call(z))}function qh(z,L){if(!(L.state.loading&4)){var R=qi.get(z);if(R)var I=R.get(null);else{R=new Map,qi.set(z,R);for(var B=z.querySelectorAll("link[data-precedence],style[data-precedence]"),F=0;F<B.length;F++){var U=B[F];(U.nodeName==="LINK"||U.getAttribute("media")!=="not all")&&(R.set(U.dataset.precedence,U),I=U)}I&&R.set(null,I)}B=L.instance,U=B.getAttribute("data-precedence"),F=R.get(U)||I,F===I&&R.set(null,B),R.set(U,B),this.count++,I=$i.bind(this),B.addEventListener("load",I),B.addEventListener("error",I),F?F.parentNode.insertBefore(B,F.nextSibling):(z=z.nodeType===9?z.head:z,z.insertBefore(B,z.firstChild)),L.state.loading|=4}}var _o={$$typeof:Nt,Provider:null,Consumer:null,_currentValue:nn,_currentValue2:nn,_threadCount:0};function jh(z,L,R,I,B,F,U,V,W){this.tag=1,this.containerInfo=z,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Pl(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Pl(0),this.hiddenUpdates=Pl(null),this.identifierPrefix=I,this.onUncaughtError=B,this.onCaughtError=F,this.onRecoverableError=U,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=W,this.incompleteTransitions=new Map}function Wh(z,L,R,I,B,F,U,V,W,yt,Ct,zt){return z=new jh(z,L,R,U,W,yt,Ct,zt,V),L=1,F===!0&&(L|=24),F=lr(3,null,null,L),z.current=F,F.stateNode=z,L=Xs(),L.refCount++,z.pooledCache=L,L.refCount++,F.memoizedState={element:I,isDehydrated:R,cache:L},Hs(F),z}function Zh(z){return z?(z=ga,z):ga}function H0(z,L,R,I,B,F){B=Zh(B),I.context===null?I.context=B:I.pendingContext=B,I=Gl(L),I.payload={element:R},F=F===void 0?null:F,F!==null&&(I.callback=F),R=Hl(z,I,L),R!==null&&(nr(R,z,L),co(R,z,L))}function $0(z,L){if(z=z.memoizedState,z!==null&&z.dehydrated!==null){var R=z.retryLane;z.retryLane=R!==0&&R<L?R:L}}function sc(z,L){$0(z,L),(z=z.alternate)&&$0(z,L)}function q0(z){if(z.tag===13||z.tag===31){var L=Rl(z,67108864);L!==null&&nr(L,z,67108864),sc(z,67108864)}}function j0(z){if(z.tag===13||z.tag===31){var L=vr();L=Vo(L);var R=Rl(z,L);R!==null&&nr(R,z,L),sc(z,L)}}var Wi=!0;function Qh(z,L,R,I){var B=Tt.T;Tt.T=null;var F=Lt.p;try{Lt.p=2,uc(z,L,R,I)}finally{Lt.p=F,Tt.T=B}}function Kh(z,L,R,I){var B=Tt.T;Tt.T=null;var F=Lt.p;try{Lt.p=8,uc(z,L,R,I)}finally{Lt.p=F,Tt.T=B}}function uc(z,L,R,I){if(Wi){var B=cc(I);if(B===null)Wu(z,L,I,Zi,R),Z0(z,I);else if(eg(B,z,L,R,I))I.stopPropagation();else if(Z0(z,I),L&4&&-1<Jh.indexOf(z)){for(;B!==null;){var F=la(B);if(F!==null)switch(F.tag){case 3:if(F=F.stateNode,F.current.memoizedState.isDehydrated){var U=Mr(F.pendingLanes);if(U!==0){var V=F;for(V.pendingLanes|=2,V.entangledLanes|=2;U;){var W=1<<31-Xn(U);V.entanglements[1]|=W,U&=~W}Zr(F),!(gn&6)&&(Mi=$n()+500,To(0,!1))}}break;case 31:case 13:V=Rl(F,2),V!==null&&nr(V,F,2),Di(),sc(F,2)}if(F=cc(I),F===null&&Wu(z,L,I,Zi,R),F===B)break;B=F}B!==null&&I.stopPropagation()}else Wu(z,L,I,null,R)}}function cc(z){return z=ps(z),fc(z)}var Zi=null;function fc(z){if(Zi=null,z=ra(z),z!==null){var L=Z(z);if(L===null)z=null;else{var R=L.tag;if(R===13){if(z=Q(L),z!==null)return z;z=null}else if(R===31){if(z=pt(L),z!==null)return z;z=null}else if(R===3){if(L.stateNode.current.memoizedState.isDehydrated)return L.tag===3?L.stateNode.containerInfo:null;z=null}else L!==z&&(z=null)}}return Zi=z,null}function W0(z){switch(z){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(ts()){case Ga:return 2;case Fo:return 8;case Sl:case ns:return 32;case Ha:return 268435456;default:return 32}default:return 32}}var dc=!1,gl=null,ml=null,vl=null,Do=new Map,Ro=new Map,yl=[],Jh="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function Z0(z,L){switch(z){case"focusin":case"focusout":gl=null;break;case"dragenter":case"dragleave":ml=null;break;case"mouseover":case"mouseout":vl=null;break;case"pointerover":case"pointerout":Do.delete(L.pointerId);break;case"gotpointercapture":case"lostpointercapture":Ro.delete(L.pointerId)}}function Oo(z,L,R,I,B,F){return z===null||z.nativeEvent!==F?(z={blockedOn:L,domEventName:R,eventSystemFlags:I,nativeEvent:F,targetContainers:[B]},L!==null&&(L=la(L),L!==null&&q0(L)),z):(z.eventSystemFlags|=I,L=z.targetContainers,B!==null&&L.indexOf(B)===-1&&L.push(B),z)}function eg(z,L,R,I,B){switch(L){case"focusin":return gl=Oo(gl,z,L,R,I,B),!0;case"dragenter":return ml=Oo(ml,z,L,R,I,B),!0;case"mouseover":return vl=Oo(vl,z,L,R,I,B),!0;case"pointerover":var F=B.pointerId;return Do.set(F,Oo(Do.get(F)||null,z,L,R,I,B)),!0;case"gotpointercapture":return F=B.pointerId,Ro.set(F,Oo(Ro.get(F)||null,z,L,R,I,B)),!0}return!1}function Q0(z){var L=ra(z.target);if(L!==null){var R=Z(L);if(R!==null){if(L=R.tag,L===13){if(L=Q(R),L!==null){z.blockedOn=L,ta(z.priority,function(){j0(R)});return}}else if(L===31){if(L=pt(R),L!==null){z.blockedOn=L,ta(z.priority,function(){j0(R)});return}}else if(L===3&&R.stateNode.current.memoizedState.isDehydrated){z.blockedOn=R.tag===3?R.stateNode.containerInfo:null;return}}}z.blockedOn=null}function Qi(z){if(z.blockedOn!==null)return!1;for(var L=z.targetContainers;0<L.length;){var R=cc(z.nativeEvent);if(R===null){R=z.nativeEvent;var I=new R.constructor(R.type,R);ds=I,R.target.dispatchEvent(I),ds=null}else return L=la(R),L!==null&&q0(L),z.blockedOn=R,!1;L.shift()}return!0}function K0(z,L,R){Qi(z)&&R.delete(L)}function tg(){dc=!1,gl!==null&&Qi(gl)&&(gl=null),ml!==null&&Qi(ml)&&(ml=null),vl!==null&&Qi(vl)&&(vl=null),Do.forEach(K0),Ro.forEach(K0)}function Ki(z,L){z.blockedOn===L&&(z.blockedOn=null,dc||(dc=!0,$.unstable_scheduleCallback($.unstable_NormalPriority,tg)))}var Ji=null;function J0(z){Ji!==z&&(Ji=z,$.unstable_scheduleCallback($.unstable_NormalPriority,function(){Ji===z&&(Ji=null);for(var L=0;L<z.length;L+=3){var R=z[L],I=z[L+1],B=z[L+2];if(typeof I!="function"){if(fc(I||R)===null)continue;break}var F=la(R);F!==null&&(z.splice(L,3),L-=3,fu(F,{pending:!0,data:B,method:R.method,action:I},I,B))}}))}function Fa(z){function L(W){return Ki(W,z)}gl!==null&&Ki(gl,z),ml!==null&&Ki(ml,z),vl!==null&&Ki(vl,z),Do.forEach(L),Ro.forEach(L);for(var R=0;R<yl.length;R++){var I=yl[R];I.blockedOn===z&&(I.blockedOn=null)}for(;0<yl.length&&(R=yl[0],R.blockedOn===null);)Q0(R),R.blockedOn===null&&yl.shift();if(R=(z.ownerDocument||z).$$reactFormReplay,R!=null)for(I=0;I<R.length;I+=3){var B=R[I],F=R[I+1],U=B[qn]||null;if(typeof F=="function")U||J0(R);else if(U){var V=null;if(F&&F.hasAttribute("formAction")){if(B=F,U=F[qn]||null)V=U.formAction;else if(fc(B)!==null)continue}else V=U.action;typeof V=="function"?R[I+1]=V:(R.splice(I,3),I-=3),J0(R)}}}function ng(){function z(F){F.canIntercept&&F.info==="react-transition"&&F.intercept({handler:function(){return new Promise(function(U){return B=U})},focusReset:"manual",scroll:"manual"})}function L(){B!==null&&(B(),B=null),I||setTimeout(R,20)}function R(){if(!I&&!navigation.transition){var F=navigation.currentEntry;F&&F.url!=null&&navigation.navigate(F.url,{state:F.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var I=!1,B=null;return navigation.addEventListener("navigate",z),navigation.addEventListener("navigatesuccess",L),navigation.addEventListener("navigateerror",L),setTimeout(R,100),function(){I=!0,navigation.removeEventListener("navigate",z),navigation.removeEventListener("navigatesuccess",L),navigation.removeEventListener("navigateerror",L),B!==null&&(B(),B=null)}}}function pc(z){this._internalRoot=z}hc.prototype.render=pc.prototype.render=function(z){var L=this._internalRoot;if(L===null)throw Error(X(409));var R=L.current;H0(R,vr(),z,L,null,null)},hc.prototype.unmount=pc.prototype.unmount=function(){var z=this._internalRoot;if(z!==null){this._internalRoot=null;var L=z.containerInfo;H0(z.current,2,null,z,null,null),Di(),L[kn]=null}};function hc(z){this._internalRoot=z}hc.prototype.unstable_scheduleHydration=function(z){if(z){var L=Yo();z={blockedOn:null,target:z,priority:L};for(var R=0;R<yl.length&&L!==0&&L<yl[R].priority;R++);yl.splice(R,0,z),R===0&&Q0(z)}};var ep=q.version;if(ep!=="19.2.4")throw Error(X(527,ep,"19.2.4"));Lt.findDOMNode=function(z){var L=z._reactInternals;if(L===void 0)throw typeof z.render=="function"?Error(X(188)):(z=Object.keys(z).join(","),Error(X(268,z)));return z=ht(L),z=z===null?null:kt(z),z=z===null?null:z.stateNode,z};var rg={bundleType:0,version:"19.2.4",rendererPackageName:"react-dom",currentDispatcherRef:Tt,reconcilerVersion:"19.2.4"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var es=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!es.isDisabled&&es.supportsFiber)try{xl=es.inject(rg),jn=es}catch{}}Y.createRoot=function(z,L){if(!H(z))throw Error(X(299));var R=!1,I="",B=Kp,F=Jp,U=eh;return L!=null&&(L.unstable_strictMode===!0&&(R=!0),L.identifierPrefix!==void 0&&(I=L.identifierPrefix),L.onUncaughtError!==void 0&&(B=L.onUncaughtError),L.onCaughtError!==void 0&&(F=L.onCaughtError),L.onRecoverableError!==void 0&&(U=L.onRecoverableError)),L=Wh(z,1,!1,null,null,R,I,null,B,F,U,ng),z[kn]=L.current,k0(z),new pc(L)}}),g=o((Y,$)=>{function q(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(q)}catch(G){console.error(G)}}q(),$.exports=h()}),_=c(u(),1),v=g(),y="#000000",b=function(){try{var Y=new URLSearchParams(location.search).get("q");if(Y)return decodeURIComponent(Y)}catch{}return"https://www.gestionvelora.com/"}(),x={skyZenith:{r:.88,g:.78,b:.92},skyHorizon:{r:.95,g:.85,b:.9},sun:{r:1.12,g:1,b:.95},skyFill:{r:.9,g:.85,b:.95},bounce:{r:.55,g:.6,b:.5}},S=.0245,C=S,w=2.5,ee=.46,T=1681*24,te=.78,E=-.55,D=-1.5708,ne=2.05,re=2.08,ie=.08,O=-.028,ae=1e5,oe=5e4;function k(Y){return`vec3f(${Y.r.toFixed(6)}, ${Y.g.toFixed(6)}, ${Y.b.toFixed(6)})`}var A=`
struct Uniforms {
  aspectRatio: f32,
  time: f32,
  blockCount: f32,
  progress: f32,
  gridSize: f32,
  cameraBobX: f32,
  cameraBobY: f32,
  season: f32,   // 0=spring, 1=summer, 2=autumn, 3=winter
}
`,se=`
${A}

struct BlockOutput {
  @builtin(position) position: vec4f,
  @location(0) uv: vec2f,
  @location(1) faceNx: f32,
  @location(2) faceNy: f32,
  @location(3) faceNz: f32,
  @location(4) blockType: f32,
  @location(5) blockH: f32,
  @location(6) col: f32,
  @location(7) row: f32,
  @location(8) layer: f32,
}

@group(0) @binding(0) var<uniform> uniforms: Uniforms;
@group(0) @binding(1) var<storage, read> blockTypes: array<u32>;
@group(0) @binding(2) var<storage, read> blockPositions: array<vec4f>;
@group(0) @binding(3) var<storage, read> blockHeights: array<f32>;
@group(0) @binding(4) var<storage, read> blockBaseY: array<f32>;

@vertex
fn main(@builtin(vertex_index) vertexIndex: u32) -> BlockOutput {
  var output: BlockOutput;
  let blockIdx = vertexIndex / 36u;
  let localVertIdx = vertexIndex % 36u;
  let faceIdx = localVertIdx / 6u;
  let vertIdx = localVertIdx % 6u;

  let blockCount = u32(uniforms.blockCount);
  if (blockIdx >= blockCount) {
    output.position = vec4f(0.0, 0.0, -10.0, 1.0);
    return output;
  }

  let posData = blockPositions[blockIdx];
  let col = posData.x;
  let row = posData.y;
  output.col = col;
  output.row = row;
  output.layer = blockBaseY[blockIdx] / ${S};

  let gridSize = uniforms.gridSize;
  let blockSize = ${S};
  let halfGrid = gridSize * blockSize * 0.5;
  let cubeSize = blockSize;

  let baseX = col * blockSize - halfGrid;
  let baseY = blockBaseY[blockIdx];
  let baseZ = row * blockSize - halfGrid;
  let h = cubeSize;
  output.blockH = h;

  let typePacked = blockTypes[blockIdx];
  output.blockType = f32(typePacked);

  let quadVerts = array<vec2f, 6>(
    vec2f(0.0, 0.0), vec2f(1.0, 0.0), vec2f(0.0, 1.0),
    vec2f(0.0, 1.0), vec2f(1.0, 0.0), vec2f(1.0, 1.0)
  );
  let qv = quadVerts[vertIdx];
  let hw = cubeSize * 0.5;
  let hd = cubeSize * 0.5;

  var localPos = vec3f(0.0);
  var normal = vec3f(0.0);

  // Gentle sway for cherry blossom blocks (type 1)
  var swayX = 0.0;
  var swayZ = 0.0;
  if (typePacked == 1u && h > 0.15) {
    let time = uniforms.time;
    swayX = sin(time * 0.8 + col * 0.3 + row * 0.2) * 0.002 * h;
    swayZ = sin(time * 0.6 + col * 0.2 + row * 0.4) * 0.0015 * h;
  }

  // Build cube faces
  if (faceIdx == 0u) {
    // Top face
    localPos = vec3f(baseX + (qv.x - 0.5) * cubeSize + swayX, baseY + h, baseZ + (qv.y - 0.5) * cubeSize + swayZ);
    normal = vec3f(0.0, 1.0, 0.0);
  } else if (faceIdx == 1u) {
    // Bottom face
    localPos = vec3f(baseX + (qv.x - 0.5) * cubeSize, baseY, baseZ + (0.5 - qv.y) * cubeSize);
    normal = vec3f(0.0, -1.0, 0.0);
  } else if (faceIdx == 2u) {
    // Front face
    localPos = vec3f(baseX + (qv.x - 0.5) * cubeSize + swayX * qv.y, baseY + qv.y * h, baseZ + hd + swayZ * qv.y);
    normal = vec3f(0.0, 0.0, 1.0);
  } else if (faceIdx == 3u) {
    // Back face
    localPos = vec3f(baseX + (0.5 - qv.x) * cubeSize + swayX * qv.y, baseY + qv.y * h, baseZ - hd + swayZ * qv.y);
    normal = vec3f(0.0, 0.0, -1.0);
  } else if (faceIdx == 4u) {
    // Right face
    localPos = vec3f(baseX + hw + swayX * qv.y, baseY + qv.y * h, baseZ + (qv.x - 0.5) * cubeSize + swayZ * qv.y);
    normal = vec3f(1.0, 0.0, 0.0);
  } else {
    // Left face
    localPos = vec3f(baseX - hw + swayX * qv.y, baseY + qv.y * h, baseZ + (0.5 - qv.x) * cubeSize + swayZ * qv.y);
    normal = vec3f(-1.0, 0.0, 0.0);
  }

  output.uv = qv;
  output.faceNx = normal.x;
  output.faceNy = normal.y;
  output.faceNz = normal.z;

  // Interpolate between 3D isometric and 2D flat view
  let progress = uniforms.progress;

  // Hide block trunk in 3D - keep ground layer (baseY == 0) visible
  if (typePacked == 2u && baseY > 0.001) {
    let trunkVis = smoothstep(0.2, 0.6, progress);
    localPos = vec3f(
      baseX + (localPos.x - baseX) * trunkVis,
      baseY + (localPos.y - baseY) * trunkVis,
      baseZ + (localPos.z - baseZ) * trunkVis,
    );
  }

  // Hide cherry blossom cubes in 3D - flowers replace them (hide earlier)
  if (typePacked == 1u) {
    let cubeVis = smoothstep(0.15, 0.6, progress);
    localPos = vec3f(
      baseX + (localPos.x - baseX) * cubeVis,
      baseY + (localPos.y - baseY) * cubeVis,
      baseZ + (localPos.z - baseZ) * cubeVis,
    );
  }

  // Hide branch blocks in 2D - they'd break QR scanning
  if (typePacked == 5u) {
    let branchVis = smoothstep(0.0, 0.4, 1.0 - progress);
    localPos = vec3f(
      baseX + (localPos.x - baseX) * branchVis,
      baseY + (localPos.y - baseY) * branchVis,
      baseZ + (localPos.z - baseZ) * branchVis,
    );
  }

  let isoAngleY = mix(${te}, 0, progress) + uniforms.cameraBobX;
  let isoAngleX = mix(${E}, ${D}, progress) + uniforms.cameraBobY;

  let cy = cos(isoAngleY); let sy = sin(isoAngleY);
  let cx = cos(isoAngleX); let sx = sin(isoAngleX);

  // Apply rotation
  let ry_x = localPos.x * cy - localPos.z * sy;
  let ry_z = localPos.x * sy + localPos.z * cy;
  let rx_y = localPos.y * cx - ry_z * sx;
  let rx_z = localPos.y * sx + ry_z * cx;

  // View scaling
  let viewScale = mix(${ne}, ${re}, progress);
  let ar = uniforms.aspectRatio;
  let scaleX = viewScale / max(ar, 1.0);
  let scaleY = viewScale / max(1.0 / ar, 1.0);

  // Centering offsets for 2D view
  let yOffsetScene = mix(-0.16, ${ie}, progress);
  let xOffsetScene = mix(0.0, ${O}, progress);

  output.position = vec4f(
    (ry_x + xOffsetScene) * scaleX,
    (rx_y + yOffsetScene) * scaleY,
    rx_z * 0.01 + 0.5,
    1.0
  );
  return output;
}
`,ce=`
${A}

struct BlockInput {
  @location(0) uv: vec2f,
  @location(1) faceNx: f32,
  @location(2) faceNy: f32,
  @location(3) faceNz: f32,
  @location(4) blockType: f32,
  @location(5) blockH: f32,
  @location(6) col: f32,
  @location(7) row: f32,
  @location(8) layer: f32,
}

@group(0) @binding(0) var<uniform> uniforms: Uniforms;

fn acesFilm(x: vec3f) -> vec3f {
  let a = 2.51; let b = 0.03; let c = 2.43; let d = 0.59; let e = 0.14;
  return clamp((x * (a * x + b)) / (x * (c * x + d) + e), vec3f(0.0), vec3f(1.0));
}

@fragment
fn main(input: BlockInput) -> @location(0) vec4f {
  let uv = input.uv;
  let N = normalize(vec3f(input.faceNx, input.faceNy, input.faceNz));
  let blockType = i32(input.blockType + 0.5);
  let progress = uniforms.progress;

  // ============================================
  // COLOR PALETTES - seasonal
  // ============================================

  let season = uniforms.season;

  // Dirt/path (QR light modules)
  let dirtLight = vec3f(0.82, 0.76, 0.66);
  let dirtMid = vec3f(0.76, 0.70, 0.60);
  let dirtDark = vec3f(0.68, 0.62, 0.52);

  // Canopy blocks - changes with season
  var sakuraLight = vec3f(0.88, 0.48, 0.55);  // Spring: pink
  var sakuraMid = vec3f(0.78, 0.34, 0.42);
  var sakuraDeep = vec3f(0.65, 0.24, 0.32);
  var sakuraRich = vec3f(0.52, 0.16, 0.24);

  // Grass - changes with season
  var grassDark = vec3f(0.10, 0.30, 0.06);
  var grassMid = vec3f(0.16, 0.42, 0.10);
  var grassBright = vec3f(0.24, 0.52, 0.14);

  if (season > 0.5 && season < 1.5) {
    // Summer - canopy is green foliage, grass is lush
    sakuraLight = vec3f(0.28, 0.52, 0.18);
    sakuraMid   = vec3f(0.18, 0.42, 0.10);
    sakuraDeep  = vec3f(0.12, 0.32, 0.08);
    sakuraRich  = vec3f(0.08, 0.24, 0.05);
    grassDark   = vec3f(0.06, 0.32, 0.04);
    grassMid    = vec3f(0.12, 0.45, 0.08);
    grassBright = vec3f(0.20, 0.55, 0.12);
  } else if (season > 1.5 && season < 2.5) {
    // Autumn - canopy is orange/red/gold, grass is dry golden
    sakuraLight = vec3f(0.92, 0.55, 0.18);
    sakuraMid   = vec3f(0.82, 0.35, 0.12);
    sakuraDeep  = vec3f(0.70, 0.22, 0.08);
    sakuraRich  = vec3f(0.55, 0.15, 0.05);
    grassDark   = vec3f(0.40, 0.30, 0.10);
    grassMid    = vec3f(0.55, 0.40, 0.12);
    grassBright = vec3f(0.68, 0.50, 0.16);
  } else if (season > 2.5) {
    // Winter - canopy is bare dark bark, grass is frost gray
    sakuraLight = vec3f(0.42, 0.36, 0.30);
    sakuraMid   = vec3f(0.35, 0.28, 0.22);
    sakuraDeep  = vec3f(0.28, 0.22, 0.16);
    sakuraRich  = vec3f(0.22, 0.16, 0.10);
    grassDark   = vec3f(0.30, 0.28, 0.22);
    grassMid    = vec3f(0.40, 0.38, 0.30);
    grassBright = vec3f(0.50, 0.48, 0.40);
  }

  // Trunk - rich warm brown (same all seasons)
  let barkLight = vec3f(0.42, 0.24, 0.14);
  let barkMid = vec3f(0.34, 0.18, 0.10);
  let barkDark = vec3f(0.24, 0.12, 0.06);
  let barkDeep = vec3f(0.18, 0.08, 0.04);

  // ============================================
  // LIGHTING SETUP
  // ============================================

  let sunDir = normalize(vec3f(-0.4, 0.85, -0.3));
  let sunCol = vec3f(1.20, 1.20, 1.20);  // neutral white light - no warm tint
  let ambient = vec3f(0.28, 0.28, 0.30);
  let skyFill = ${k(x.skyFill)};
  let bounce = ${k(x.bounce)};

  let NdSun = max(dot(N, sunDir), 0.0);
  let NdUp = max(dot(N, vec3f(0.0, 1.0, 0.0)), 0.0);

  // ============================================
  // PER-BLOCK NOISE
  // ============================================

  let layer = input.layer;
  let seed = vec2f(input.col, input.row);
  let blockSeed = seed.x * 17.3 + seed.y * 31.1 + layer * 73.7;
  let noise1 = fract(sin(blockSeed) * 43758.5);
  let noise2 = fract(sin(blockSeed * 1.7 + 127.1) * 43758.5);
  let noise3 = fract(sin(blockSeed * 2.3 + 311.7) * 43758.5);

  // ============================================
  // TREE SHADOW CALCULATION
  // ============================================

  let gridSize = uniforms.gridSize;
  let cx = gridSize * 0.5;
  let cy = gridSize * 0.5;
  let shadowOffsetX = 1.5;
  let shadowOffsetY = 1.5;
  let dx = input.col - (cx + shadowOffsetX);
  let dy = input.row - (cy + shadowOffsetY);
  let distFromShadowCenter = sqrt(dx * dx + dy * dy);
  let canopyRadius = gridSize * 0.46;
  let trunkRadius = 2.5;
  let shadowT = 1.0 - smoothstep(trunkRadius, canopyRadius, distFromShadowCenter);
  // Stronger AO near trunk base, softer toward edges
  let trunkAO = (1.0 - smoothstep(0.0, trunkRadius * 1.5, distFromShadowCenter)) * 0.20;
  let treeShadow = 1.0 - shadowT * 0.35 - trunkAO;

  // Canopy self-shadowing
  let maxCanopyLayer = 15.0;
  let layerRatio = min(layer / maxCanopyLayer, 1.0);
  let canopyAO = 0.65 + layerRatio * 0.35;

  var albedo = vec3f(0.5);

  // ============================================
  // TOP FACE - What QR scanner sees in 2D
  // ============================================

  if (input.faceNy > 0.5) {
    let topWarmTint = vec3f(1.1, 1.08, 1.02);

    // Darken dark QR modules and brighten light ones - consistent in both views
    let isDarkModule = step(0.5, f32(blockType));

    if (blockType == 0) {
      // SAND/DIRT - high noise variation to break grid look
      var dirtColor = dirtMid;
      let t = noise1;
      if (t < 0.4) {
        dirtColor = mix(dirtLight, dirtMid, t / 0.4);
      } else if (t < 0.7) {
        dirtColor = mix(dirtMid, dirtDark, (t - 0.4) / 0.3);
      } else {
        // Some grains are darker
        dirtColor = mix(dirtDark, dirtDark * 0.85, (t - 0.7) / 0.3);
      }
      // Strong per-block variation for sandy texture
      let shift = (noise2 - 0.5) * 0.18;
      let grain = (noise3 - 0.5) * 0.08;
      dirtColor = dirtColor * (1.0 + shift + grain) * treeShadow;

      // Seasonal ground cover speckles under canopy
      let distFromCenter = sqrt((input.col - cx) * (input.col - cx) + (input.row - cy) * (input.row - cy));
      let underCanopy = step(distFromCenter, canopyRadius);
      let speckleChance = noise3 * underCanopy;

      if (season < 0.5) {
        // Spring: scattered pink petal speckles
        let petalTint = vec3f(0.90, 0.72, 0.70);
        dirtColor = mix(dirtColor, petalTint, step(0.85, speckleChance) * 0.4);
      } else if (season < 1.5) {
        // Summer: clean ground, maybe tiny green speckles
        let greenSpeck = vec3f(0.55, 0.68, 0.42);
        dirtColor = mix(dirtColor, greenSpeck, step(0.92, speckleChance) * 0.2);
      } else if (season < 2.5) {
        // Autumn: scattered fallen leaf speckles (orange/brown)
        let leafSpeck = mix(vec3f(0.85, 0.52, 0.15), vec3f(0.72, 0.35, 0.10), noise1);
        dirtColor = mix(dirtColor, leafSpeck, step(0.70, speckleChance) * 0.5);
      } else {
        // Winter: snow patches
        let snowPatch = vec3f(0.92, 0.93, 0.96);
        dirtColor = mix(dirtColor, snowPatch, step(0.55, speckleChance) * 0.7);
      }

      albedo = dirtColor * topWarmTint;

    } else if (blockType == 1) {
      // CHERRY BLOSSOM
      var cherryColor = sakuraMid;
      let t = noise1;
      if (t < 0.33) {
        cherryColor = mix(sakuraLight, sakuraMid, t / 0.33);
      } else if (t < 0.66) {
        cherryColor = mix(sakuraMid, sakuraDeep, (t - 0.33) / 0.33);
      } else {
        cherryColor = mix(sakuraDeep, sakuraRich, (t - 0.66) / 0.34);
      }
      let shift = (noise2 - 0.5) * 0.15;
      cherryColor = cherryColor * (1.0 + shift);

      // Edge rounding effect (fades in 2D)
      let edgeX = min(uv.x, 1.0 - uv.x);
      let edgeY = min(uv.y, 1.0 - uv.y);
      let edgeDist = min(edgeX, edgeY);
      let roundedEdge = smoothstep(0.0, 0.12, edgeDist);
      let edgeDarken = mix(0.88, 1.0, roundedEdge);
      let finalEdge = mix(edgeDarken, 1.0, progress);

      albedo = cherryColor * topWarmTint * canopyAO * finalEdge;

    } else if (blockType == 2) {
      // TRUNK top face - sandy at ground level, bark higher up
      let trunkMaxLayer = 18.0;
      let heightRatio = min(layer / trunkMaxLayer, 1.0);

      // Ground-level trunk blocks blend into surrounding sand
      let sandColor = vec3f(0.85, 0.78, 0.64);
      let sandShift = (noise1 - 0.5) * 0.1;
      let groundSand = sandColor * (1.0 + sandShift) * treeShadow;

      var barkColor = mix(barkMid, barkLight, noise1 * 0.4);
      let shift = (noise2 - 0.5) * 0.15;
      barkColor = barkColor * (1.0 + shift);
      let aoShadow = 0.6 + heightRatio * 0.4;

      // Blend: ground level = sand, upper = bark
      let sandBlend = smoothstep(0.0, 0.15, heightRatio);
      albedo = mix(groundSand, barkColor * aoShadow, sandBlend) * topWarmTint;

    } else if (blockType == 3) {
      // GRASS
      let grassBrown = vec3f(0.28, 0.25, 0.12);
      let grassOlive = vec3f(0.32, 0.35, 0.15);

      var grassColor = grassMid;
      let t = noise1;
      if (t < 0.3) {
        grassColor = mix(grassBright, grassMid, t / 0.3);
      } else if (t < 0.6) {
        grassColor = mix(grassMid, grassDark, (t - 0.3) / 0.3);
      } else if (t < 0.8) {
        grassColor = mix(grassDark, grassBrown, (t - 0.6) / 0.2);
      } else {
        grassColor = mix(grassBrown, grassOlive, (t - 0.8) / 0.2);
      }
      let shift = (noise2 - 0.5) * 0.2;
      grassColor = grassColor * (1.0 + shift);

      albedo = grassColor * topWarmTint;

    } else if (blockType == 5) {
      // BRANCH - circular cross-section on top face
      var branchColor = mix(barkMid, barkLight, noise1 * 0.5);
      let bShift = (noise2 - 0.5) * 0.12;
      branchColor = branchColor * (1.0 + bShift);
      let ringNoise = sin(noise1 * 12.0 + noise2 * 6.0) * 0.06 + 0.94;
      albedo = branchColor * ringNoise * topWarmTint * canopyAO;

    } else {
      // FALLEN PETALS (type 4) - same sandy base as dirt, very subtle pink hint
      // This minimizes the checkerboard between dark/light QR cells
      let sandA = vec3f(0.84, 0.77, 0.63);
      let sandB = vec3f(0.80, 0.73, 0.60);
      let sandPink = vec3f(0.84, 0.74, 0.66); // barely pink

      var fallenColor = sandA;
      if (noise1 < 0.4) {
        fallenColor = mix(sandA, sandB, noise2);
      } else if (noise1 < 0.75) {
        fallenColor = mix(sandB, sandPink, noise2 * 0.5);
      } else {
        fallenColor = mix(sandA, sandPink, noise2 * 0.4);
      }
      let shift = (noise2 - 0.5) * 0.12;
      fallenColor = fallenColor * (1.0 + shift) * treeShadow;
      albedo = fallenColor * topWarmTint;
    }

    // In 3D: subtle contrast between dark/light modules
    // In 2D: strong contrast for QR scanning
    let qrBoost = progress * progress;
    let darkFactor = mix(0.70, 0.45, qrBoost);   // subtle in 3D, moderate in 2D
    let lightFactor = mix(0.4, 0.75, qrBoost);    // subtle in 3D, moderate in 2D
    let darkened = albedo * darkFactor;
    let brightened = mix(albedo, vec3f(1.0), lightFactor);
    albedo = mix(brightened, darkened, isDarkModule);

  // ============================================
  // SIDE FACES
  // ============================================

  } else if (abs(input.faceNz) > 0.5 || abs(input.faceNx) > 0.5) {
    let faceN = normalize(vec3f(input.faceNx, input.faceNy, input.faceNz));
    let sunLight = max(dot(faceN, sunDir), 0.0);
    let shade = 0.3 + sunLight * 0.65;
    let tint = vec3f(0.95, 0.95, 0.98);

    // Ground-level side faces \u2192 warm stone look
    if (layer < 1.0 && (blockType == 0 || blockType == 3 || blockType == 4)) {
      let stoneLight = vec3f(0.78, 0.72, 0.64);
      let stoneMid = vec3f(0.68, 0.62, 0.54);
      let stoneDark = vec3f(0.58, 0.52, 0.45);
      var stoneColor = stoneMid;
      if (noise1 < 0.35) {
        stoneColor = mix(stoneLight, stoneMid, noise2);
      } else if (noise1 < 0.7) {
        stoneColor = mix(stoneMid, stoneDark, noise2 * 0.6);
      } else {
        stoneColor = mix(stoneDark, stoneLight, noise2 * 0.3);
      }
      let stoneShift = (noise3 - 0.5) * 0.08;
      stoneColor = stoneColor * (1.0 + stoneShift);
      albedo = stoneColor * shade * tint;

    } else if (blockType == 0) {
      var dirtColor = dirtMid;
      let t = noise1;
      if (t < 0.4) {
        dirtColor = mix(dirtLight, dirtMid, t / 0.4);
      } else if (t < 0.7) {
        dirtColor = mix(dirtMid, dirtDark, (t - 0.4) / 0.3);
      } else {
        dirtColor = dirtDark * (1.0 - (t - 0.7) * 0.2);
      }
      let shift = (noise2 - 0.5) * 0.2;
      dirtColor = dirtColor * (1.0 + shift);
      albedo = dirtColor * shade * tint;

    } else if (blockType == 1) {
      var cherryColor = sakuraMid;
      let t = noise1;
      if (t < 0.33) {
        cherryColor = mix(sakuraLight, sakuraMid, t / 0.33);
      } else if (t < 0.66) {
        cherryColor = mix(sakuraMid, sakuraDeep, (t - 0.33) / 0.33);
      } else {
        cherryColor = mix(sakuraDeep, sakuraRich, (t - 0.66) / 0.34);
      }
      let shift = (noise2 - 0.5) * 0.25;
      cherryColor = cherryColor * (1.0 + shift);

      let edgeX = min(uv.x, 1.0 - uv.x);
      let edgeY = min(uv.y, 1.0 - uv.y);
      let edgeDist = min(edgeX, edgeY);
      let roundedEdge = smoothstep(0.0, 0.12, edgeDist);
      let edgeDarken = mix(0.7, 1.0, roundedEdge);

      albedo = cherryColor * shade * tint * canopyAO * edgeDarken;

    } else if (blockType == 2) {
      // --- ORGANIC TRUNK: gnarled bark with wood grain (Blender-style) ---

      let trunkCx = gridSize * 0.5;
      let trunkCy = gridSize * 0.5;
      let radX = input.col - trunkCx;
      let radZ = input.row - trunkCy;
      let radLen = max(sqrt(radX * radX + radZ * radZ), 0.01);
      let cylNormalX = radX / radLen;
      let cylNormalZ = radZ / radLen;

      let cylN = normalize(vec3f(cylNormalX * 0.8 + faceN.x * 0.2, faceN.y * 0.15, cylNormalZ * 0.8 + faceN.z * 0.2));
      let cylSunLight = max(dot(cylN, sunDir), 0.0);

      let trunkMaxLayer = 18.0;
      let heightRatio = min(layer / trunkMaxLayer, 1.0);

      // Multi-frequency bark grooves for organic gnarled look
      let barkAngle = atan2(radZ, radX);
      let groove1 = sin(barkAngle * 12.0 + noise1 * 2.0) * 0.5 + 0.5;
      let groove2 = sin(barkAngle * 7.0 + noise2 * 3.5 + 1.7) * 0.5 + 0.5;
      let groove3 = sin(barkAngle * 20.0 + noise1 * 5.0) * 0.5 + 0.5;
      let grooveDepth = (groove1 * 0.5 + groove2 * 0.3 + groove3 * 0.2) * 0.25 + 0.75;

      // Twisted wood grain - spiral pattern up the trunk
      let spiralAngle = barkAngle + heightRatio * 2.5 + noise1 * 0.5;
      let woodGrain = sin(spiralAngle * 8.0 + layer * 2.0) * 0.08 + 0.92;

      // Horizontal ring pattern - knot-like detail
      let ringPattern = sin(layer * 3.5 + noise2 * 4.0) * 0.10 + 0.90;
      let knotNoise = sin(barkAngle * 3.0 + layer * 5.0 + noise3 * 6.0);
      let knot = smoothstep(0.85, 0.95, knotNoise) * 0.15;

      // Base bark color - warmer with purple undertone at height
      var barkColor = mix(barkDark, barkMid, heightRatio * 0.7);
      barkColor = mix(barkColor, barkLight, groove1 * 0.3);
      let purpleUndertone = vec3f(0.08, 0.02, 0.10) * heightRatio * 0.3;
      barkColor = barkColor + purpleUndertone;
      let shift = (noise2 - 0.5) * 0.18;
      barkColor = barkColor * (1.0 + shift);
      barkColor = barkColor - knot;

      // Cylindrical AO
      let edgeFade = 1.0 - smoothstep(0.6, 1.0, abs(dot(cylN, normalize(vec3f(faceN.x, 0.0, faceN.z)))));
      let cylAO = 0.7 + edgeFade * 0.3;
      let vertAO = 0.60 + heightRatio * 0.40;

      let trunkShade = 0.22 + cylSunLight * 0.75;
      var trunkAlbedo = barkColor * trunkShade * grooveDepth * woodGrain * ringPattern * cylAO * vertAO * tint;

      // Ground-level trunk sides blend to sand
      let sandSideColor = vec3f(0.78, 0.72, 0.58) * shade * tint;
      let sideBlend = smoothstep(0.0, 0.15, heightRatio);
      albedo = mix(sandSideColor, trunkAlbedo, sideBlend);

    } else if (blockType == 3) {
      let grassBrown = vec3f(0.28, 0.25, 0.12);
      let grassOlive = vec3f(0.32, 0.35, 0.15);

      var grassColor = grassMid;
      let t = noise1;
      if (t < 0.3) {
        grassColor = mix(grassBright, grassMid, t / 0.3);
      } else if (t < 0.6) {
        grassColor = mix(grassMid, grassDark, (t - 0.6) / 0.3);
      } else if (t < 0.8) {
        grassColor = mix(grassDark, grassBrown, (t - 0.6) / 0.2);
      } else {
        grassColor = mix(grassBrown, grassOlive, (t - 0.8) / 0.2);
      }
      let shift = (noise2 - 0.5) * 0.2;
      grassColor = grassColor * (1.0 + shift);
      albedo = grassColor * shade * tint;

    } else if (blockType == 5) {
      // BRANCH side - bark texture with cylindrical shading
      var branchColor = mix(barkDark, barkMid, noise1 * 0.6);
      let grooveSide = sin(layer * 5.0 + noise1 * 3.0) * 0.08 + 0.92;
      let bShift = (noise2 - 0.5) * 0.15;
      branchColor = branchColor * (1.0 + bShift) * grooveSide;
      albedo = branchColor * shade * tint;

    } else {
      // Side face fallen petals - sandy to match top
      let sandSide = vec3f(0.72, 0.66, 0.52);
      let sandSideDark = vec3f(0.62, 0.56, 0.44);
      var fallenColor = mix(sandSide, sandSideDark, noise1 * 0.5);
      let shift = (noise2 - 0.5) * 0.12;
      fallenColor = fallenColor * (1.0 + shift);
      albedo = fallenColor * shade * tint;
    }

  // ============================================
  // BOTTOM FACE
  // ============================================

  } else {
    let bottomTint = vec3f(0.65, 0.62, 0.58); // warm stone underneath
    let fallenBottom = vec3f(0.50, 0.45, 0.38);

    if (blockType == 0) {
      albedo = dirtDark * 0.5 * bottomTint;
    } else if (blockType == 1) {
      albedo = sakuraDeep * 0.5 * bottomTint;
    } else if (blockType == 2) {
      albedo = barkDark * 0.5 * bottomTint;
    } else if (blockType == 3) {
      albedo = grassDark * 0.5 * bottomTint;
    } else if (blockType == 5) {
      albedo = barkDark * 0.5 * bottomTint;
    } else {
      albedo = fallenBottom * 0.6 * bottomTint;
    }
  }

  // ============================================
  // FINAL LIGHTING & TONEMAPPING
  // ============================================

  // Rim light for depth and edge definition
  let viewDir = normalize(vec3f(0.4, 0.6, 0.7));
  let rimDot = 1.0 - max(dot(N, viewDir), 0.0);
  let rimLight = pow(rimDot, 4.0) * 0.06 * vec3f(0.85, 0.75, 0.95);

  let diffuse = albedo * (ambient + sunCol * NdSun * 0.85 + skyFill * NdUp * 0.18 + bounce * 0.15) + rimLight;
  var hdr = diffuse;
  hdr = acesFilm(hdr * 1.15);
  hdr = pow(hdr, vec3f(1.0 / 2.2));

  // Saturation boost
  let grayB = dot(hdr, vec3f(0.299, 0.587, 0.114));
  hdr = mix(vec3f(grayB), hdr, 1.25);

  return vec4f(hdr, 1.0);
}
`,le=`
${A}

struct SkyOut {
  @builtin(position) position: vec4f,
  @location(0) uv: vec2f,
}

@group(0) @binding(0) var<uniform> uniforms: Uniforms;

@vertex
fn main(@builtin(vertex_index) vi: u32) -> SkyOut {
  var tri = array<vec2f, 3>(
    vec2f(-1.0, -1.0),
    vec2f(3.0, -1.0),
    vec2f(-1.0, 3.0)
  );
  let p = tri[vi];
  var o: SkyOut;
  o.position = vec4f(p, 1.0, 1.0);
  o.uv = vec2f(p.x * 0.5 + 0.5, 0.5 - p.y * 0.5);
  return o;
}
`,ue=`
${A}

@group(0) @binding(0) var<uniform> uniforms: Uniforms;

@fragment
fn main(@location(0) uv: vec2f) -> @location(0) vec4f {
  return vec4f(0.0, 0.0, 0.0, 1.0);
}
`,de=`
${A}

struct ShadowOut {
  @builtin(position) position: vec4f,
  @location(0) uv: vec2f,
}

@group(0) @binding(0) var<uniform> uniforms: Uniforms;

@vertex
fn main(@builtin(vertex_index) vi: u32) -> ShadowOut {
  var quadVerts = array<vec2f, 6>(
    vec2f(-1.0, -1.0), vec2f(1.0, -1.0), vec2f(-1.0, 1.0),
    vec2f(-1.0, 1.0), vec2f(1.0, -1.0), vec2f(1.0, 1.0)
  );

  let qv = quadVerts[vi];
  var o: ShadowOut;
  o.uv = qv * 0.5 + 0.5;

  let gridSize = uniforms.gridSize;
  let blockSize = ${S};
  let halfGrid = gridSize * blockSize * 0.5;
  let shadowScale = 0.85;

  let progress = uniforms.progress;
  let shadowHeight = 0.48;
  let lightDirXZ = vec2f(-0.5, -0.5);
  let shadowOffset = -lightDirXZ * shadowHeight * 0.35 * (1.0 - progress);

  let localX = qv.x * halfGrid * shadowScale + shadowOffset.x;
  let localY = -shadowHeight;
  let localZ = qv.y * halfGrid * shadowScale + shadowOffset.y;

  let isoAngleY = mix(${te}, 0, progress) + uniforms.cameraBobX;
  let isoAngleX = mix(${E}, ${D}, progress) + uniforms.cameraBobY;

  let cy = cos(isoAngleY); let sy = sin(isoAngleY);
  let cx = cos(isoAngleX); let sx = sin(isoAngleX);

  let ry_x = localX * cy - localZ * sy;
  let ry_z = localX * sy + localZ * cy;
  let rx_y = localY * cx - ry_z * sx;
  let rx_z = localY * sx + ry_z * cx;

  let viewScale = mix(${ne}, ${re}, progress);
  let ar = uniforms.aspectRatio;
  let scaleX = viewScale / max(ar, 1.0);
  let scaleY = viewScale / max(1.0 / ar, 1.0);

  let yOffsetScene = mix(-0.16, ${ie}, progress);
  let xOffsetScene = mix(0.0, ${O}, progress);

  o.position = vec4f(
    (ry_x + xOffsetScene) * scaleX,
    (rx_y + yOffsetScene) * scaleY,
    0.99,
    1.0
  );

  return o;
}
`,j=`
${A}

@group(0) @binding(0) var<uniform> uniforms: Uniforms;

@fragment
fn main(@location(0) uv: vec2f) -> @location(0) vec4f {
  let centered = uv * 2.0 - 1.0;
  let dist = length(centered);

  return vec4f(0.0, 0.0, 0.0, 0.0);
}
`,fe=`
${A}

struct FlowerOutput {
  @builtin(position) position: vec4f,
  @location(0) petalT: f32,
  @location(1) normalX: f32,
  @location(2) normalY: f32,
  @location(3) normalZ: f32,
  @location(4) seed: f32,
  @location(5) isCenter: f32,
}

@group(0) @binding(0) var<uniform> uniforms: Uniforms;
@group(0) @binding(1) var<storage, read> flowerPositions: array<vec4f>;

@vertex
fn main(@builtin(vertex_index) vertexIndex: u32) -> FlowerOutput {
  var output: FlowerOutput;

  let vertsPerFlower = 150u;
  let flowerIdx = vertexIndex / vertsPerFlower;
  let localVert = vertexIndex % vertsPerFlower;

  let flowerData = flowerPositions[flowerIdx];
  let col = flowerData.x;
  let row = flowerData.y;
  let topY = flowerData.z;
  let rawSeed = flowerData.w;

  // seed >= 1.0 means leaf, actual seed is rawSeed - 1.0
  let isLeaf = step(1.0, rawSeed);
  let seed = rawSeed - isLeaf;
  output.seed = rawSeed;

  let progress = uniforms.progress;

  // Visibility: flowers shrink away as we approach 2D mode
  let vis = smoothstep(0.0, 0.6, 1.0 - progress);
  if (vis < 0.01) {
    output.position = vec4f(0.0, 0.0, -10.0, 1.0);
    return output;
  }

  let blockSize = f32(${S});
  let gridSize = uniforms.gridSize;
  let halfGrid = gridSize * blockSize * 0.5;

  // Flower center in world space
  let centerX = col * blockSize - halfGrid;
  let centerY = topY;
  let centerZ = row * blockSize - halfGrid;

  // Wind - coherent with grass and branches
  let time = uniforms.time;
  let isGroundPetal = step(topY, blockSize * 2.5);
  let windFactor = (1.0 - isGroundPetal) * vis;
  // Primary wind direction + secondary turbulence (increased for visibility)
  let windBase = sin(time * 0.45 + col * 0.25 + row * 0.15) * 0.028;
  let windTurb = sin(time * 1.1 + col * 0.8 + row * 0.6) * 0.008;
  let swayX = (windBase + windTurb) * windFactor;
  let swayZ = sin(time * 0.35 + col * 0.15 + row * 0.25) * 0.018 * windFactor;

  // Flower sizing - leaves are longer and narrower
  let baseScale = blockSize * (0.7 + seed * 0.3) * vis;
  let flowerScale = mix(baseScale, baseScale * 0.9, isLeaf);
  let petalLength = mix(flowerScale * 0.85, flowerScale * 1.3, isLeaf);
  let petalWidth = mix(flowerScale * 0.38, flowerScale * 0.18, isLeaf);
  let curlHeight = mix(blockSize * 0.18, blockSize * 0.08, isLeaf) * vis;
  let centerRadius = mix(blockSize * 0.12, blockSize * 0.04, isLeaf) * vis;

  // Per-flower rotation
  let baseRotation = seed * 6.28318;

  // Gentle tilt - subtle variation, mostly upward-facing
  let tiltAngle = (seed * 0.25 + 0.05) * (1.0 - isLeaf * 0.5);
  let tiltDir = seed * 6.28318 * 3.17;
  let tiltCos = cos(tiltAngle);
  let tiltSin = sin(tiltAngle);
  let tiltAxisX = cos(tiltDir);
  let tiltAxisZ = sin(tiltDir);

  var localPos = vec3f(0.0);
  var normal = vec3f(0.0, 1.0, 0.0);
  output.isCenter = 0.0;
  output.petalT = 0.0;

  if (localVert < 120u) {
    // ===== PETAL GEOMETRY =====
    // 5 petals, each with 4 quad-strip segments (8 triangles = 24 verts)
    let petalIdx = localVert / 24u;
    let segVert = localVert % 24u;
    let segIdx = segVert / 6u;       // segment 0-3
    let triVert = segVert % 6u;      // vertex within segment quad

    // Petal direction angle
    let petalAngle = f32(petalIdx) * 1.25664 + baseRotation; // 2\u03C0/5
    let cosA = cos(petalAngle);
    let sinA = sin(petalAngle);

    // Collapse petals 3+4 for leaves (show only 3 petals)
    var petalScale = 1.0;
    if (isLeaf > 0.5 && petalIdx >= 3u) {
      petalScale = 0.0;
    }

    // Which row in the quad strip (0-4 for 5 rows)
    var rowIdx: u32;
    var side: f32; // -1 left, +1 right
    if (triVert == 0u) { rowIdx = segIdx;     side = -1.0; }
    else if (triVert == 1u) { rowIdx = segIdx;     side =  1.0; }
    else if (triVert == 2u) { rowIdx = segIdx + 1u; side = -1.0; }
    else if (triVert == 3u) { rowIdx = segIdx + 1u; side = -1.0; }
    else if (triVert == 4u) { rowIdx = segIdx;     side =  1.0; }
    else { rowIdx = segIdx + 1u; side =  1.0; }

    // Parametric t along petal length (0=base, 1=tip)
    let t = f32(rowIdx) * 0.25;
    output.petalT = t;

    // Distance from center along petal direction
    let dist = t * petalLength * petalScale;

    // Half-width: sin curve, widest mid-petal, tapered at ends
    let hw = petalWidth * sin(t * 3.14159) * sqrt(1.0 - t * 0.3) * petalScale;

    // Parabolic upward curl
    let curl = curlHeight * 4.0 * t * (1.0 - t);

    // Position in petal-local space (along petal direction + perpendicular)
    let alongX = dist * cosA;
    let alongZ = dist * sinA;
    let perpX = side * hw * (-sinA);
    let perpZ = side * hw * cosA;

    localPos = vec3f(
      centerX + alongX + perpX + swayX,
      centerY + curl,
      centerZ + alongZ + perpZ + swayZ,
    );

    // Normal from curl derivative
    let curlSlope = curlHeight * 4.0 * (1.0 - 2.0 * t);
    normal = normalize(vec3f(
      -curlSlope * cosA + side * 0.2 * sinA,
      1.0,
      -curlSlope * sinA - side * 0.2 * cosA,
    ));
  } else {
    // ===== CENTER DISK =====
    output.isCenter = 1.0;
    let diskVert = localVert - 120u;
    let triIdx = diskVert / 3u;     // 0-9 (10 triangles)
    let triV = diskVert % 3u;       // 0-2

    let centerElevation = curlHeight * 0.8;

    if (triV == 0u) {
      // Center point
      localPos = vec3f(centerX + swayX, centerY + centerElevation, centerZ + swayZ);
      normal = vec3f(0.0, 1.0, 0.0);
    } else {
      let angleIdx = select(triIdx, triIdx + 1u, triV == 2u);
      let angle = f32(angleIdx) * 0.62832 + baseRotation; // 2\u03C0/10
      localPos = vec3f(
        centerX + cos(angle) * centerRadius + swayX,
        centerY + centerElevation * 0.9,
        centerZ + sin(angle) * centerRadius + swayZ,
      );
      normal = vec3f(0.0, 1.0, 0.0);
    }
  }

  // Apply random tilt - rotate offset from center around a random horizontal axis
  let offX = localPos.x - centerX - swayX;
  let offY = localPos.y - centerY;
  let offZ = localPos.z - centerZ - swayZ;

  // Rodrigues rotation around axis (tiltAxisX, 0, tiltAxisZ)
  let dotAO = tiltAxisX * offX + tiltAxisZ * offZ;
  let crossX = -tiltAxisZ * offY;
  let crossY = tiltAxisZ * offX - tiltAxisX * offZ;
  let crossZ = tiltAxisX * offY;

  let rotX = offX * tiltCos + crossX * tiltSin + tiltAxisX * dotAO * (1.0 - tiltCos);
  let rotY = offY * tiltCos + crossY * tiltSin;
  let rotZ = offZ * tiltCos + crossZ * tiltSin + tiltAxisZ * dotAO * (1.0 - tiltCos);

  localPos = vec3f(
    centerX + swayX + rotX,
    centerY + rotY,
    centerZ + swayZ + rotZ,
  );

  // Also rotate normal
  let nDotA = tiltAxisX * normal.x + tiltAxisZ * normal.z;
  let nCrossX = -tiltAxisZ * normal.y;
  let nCrossY = tiltAxisZ * normal.x - tiltAxisX * normal.z;
  let nCrossZ = tiltAxisX * normal.y;
  normal = normalize(vec3f(
    normal.x * tiltCos + nCrossX * tiltSin + tiltAxisX * nDotA * (1.0 - tiltCos),
    normal.y * tiltCos + nCrossY * tiltSin,
    normal.z * tiltCos + nCrossZ * tiltSin + tiltAxisZ * nDotA * (1.0 - tiltCos),
  ));

  // Scale toward center for 2D transition
  localPos = vec3f(
    centerX + swayX + (localPos.x - centerX - swayX) * vis,
    centerY + (localPos.y - centerY) * vis,
    centerZ + swayZ + (localPos.z - centerZ - swayZ) * vis,
  );

  output.normalX = normal.x;
  output.normalY = normal.y;
  output.normalZ = normal.z;

  // Camera transform (identical to blocks shader)
  let isoAngleY = mix(${te}, 0, progress) + uniforms.cameraBobX;
  let isoAngleX = mix(${E}, ${D}, progress) + uniforms.cameraBobY;

  let cy = cos(isoAngleY); let sy = sin(isoAngleY);
  let cx = cos(isoAngleX); let sx = sin(isoAngleX);

  let ry_x = localPos.x * cy - localPos.z * sy;
  let ry_z = localPos.x * sy + localPos.z * cy;
  let rx_y = localPos.y * cx - ry_z * sx;
  let rx_z = localPos.y * sx + ry_z * cx;

  let viewScale = mix(${ne}, ${re}, progress);
  let ar = uniforms.aspectRatio;
  let scaleX = viewScale / max(ar, 1.0);
  let scaleY = viewScale / max(1.0 / ar, 1.0);

  let yOffsetScene = mix(-0.16, ${ie}, progress);
  let xOffsetScene = mix(0.0, ${O}, progress);

  output.position = vec4f(
    (ry_x + xOffsetScene) * scaleX,
    (rx_y + yOffsetScene) * scaleY,
    rx_z * 0.01 + 0.5,
    1.0
  );
  return output;
}
`,pe=`
${A}

struct FlowerInput {
  @location(0) petalT: f32,
  @location(1) normalX: f32,
  @location(2) normalY: f32,
  @location(3) normalZ: f32,
  @location(4) seed: f32,
  @location(5) isCenter: f32,
}

@group(0) @binding(0) var<uniform> uniforms: Uniforms;

fn acesFilm(x: vec3f) -> vec3f {
  let a = 2.51; let b = 0.03; let c = 2.43; let d = 0.59; let e = 0.14;
  return clamp((x * (a * x + b)) / (x * (c * x + d) + e), vec3f(0.0), vec3f(1.0));
}

@fragment
fn main(input: FlowerInput) -> @location(0) vec4f {
  let N = normalize(vec3f(input.normalX, input.normalY, input.normalZ));
  let t = input.petalT;
  let rawSeed = input.seed;
  let origIsLeaf = step(1.0, rawSeed);
  let seed = rawSeed - origIsLeaf;

  let season = uniforms.season;

  // \u2500\u2500 Season determines what the tree looks like \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  // Spring: cherry blossoms (mostly flowers, some leaves)
  // Summer: dense green foliage (almost all leaves, no flowers)
  // Autumn: colored leaves falling (all leaves in warm tones)
  // Winter: mostly bare (many flowers hidden via alpha, sparse pale buds)

  // Override isLeaf based on season - controls geometry (3 petals vs 5)
  // and color path. In summer/autumn, most "flowers" become leaves.
  let leafChance = fract(seed * 4.37);
  var isLeaf = origIsLeaf;
  // isGroundFlower: fallen petals sit near ground (low topY encoded via seed proximity)
  // We use the original rawSeed - ground flowers have seed < 1.0 and low positions
  let isGroundFlower = step(input.petalT, 0.01) * (1.0 - origIsLeaf); // base verts of non-leaf = likely ground

  if (season > 0.5 && season < 1.5) {
    // Summer: all canopy = leaves, NO ground flowers, NO falling
    isLeaf = 1.0;
    // Hide ground-level fallen petals in summer
    if (leafChance < 0.95 && input.isCenter < 0.5) {
      // Keep only ~5% as tiny ground details
    }
  } else if (season > 1.5 && season < 2.5) {
    // Autumn: sparse canopy (40% hidden = bare branches showing)
    // but ground flowers stay (fallen leaves)
    isLeaf = 1.0;
    if (leafChance < 0.40) {
      discard;
    }
  } else if (season > 2.5) {
    // Winter: 80% hidden (bare branches), rest are sparse pale buds
    if (leafChance < 0.80) {
      discard;
    }
  }

  // \u2500\u2500 Leaf colors per season \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  var leafDark   = vec3f(0.25, 0.40, 0.22);
  var leafMedium = vec3f(0.40, 0.55, 0.30);
  var leafLight  = vec3f(0.55, 0.68, 0.38);
  var leafOlive  = vec3f(0.48, 0.52, 0.28);

  if (season > 0.5 && season < 1.5) {
    // Summer - rich dark greens, dense foliage
    leafDark   = vec3f(0.08, 0.28, 0.05);
    leafMedium = vec3f(0.14, 0.38, 0.08);
    leafLight  = vec3f(0.22, 0.48, 0.12);
    leafOlive  = vec3f(0.18, 0.35, 0.10);
  } else if (season > 1.5 && season < 2.5) {
    // Autumn - warm oranges, reds, golds, browns
    leafDark   = vec3f(0.55, 0.18, 0.08);
    leafMedium = vec3f(0.72, 0.32, 0.10);
    leafLight  = vec3f(0.85, 0.52, 0.15);
    leafOlive  = vec3f(0.78, 0.58, 0.12);
  } else if (season > 2.5) {
    // Winter - muted gray-brown bare twigs
    leafDark   = vec3f(0.35, 0.32, 0.28);
    leafMedium = vec3f(0.45, 0.42, 0.38);
    leafLight  = vec3f(0.55, 0.52, 0.48);
    leafOlive  = vec3f(0.40, 0.38, 0.35);
  }

  // \u2500\u2500 Petal/flower colors per season \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  var shadeDeep   = vec3f(0.85, 0.22, 0.38);
  var shadeMedium = vec3f(0.92, 0.40, 0.52);
  var shadeLight  = vec3f(0.96, 0.58, 0.66);
  var shadePale   = vec3f(0.98, 0.75, 0.80);
  var shadeBlush  = vec3f(0.97, 0.65, 0.72);
  var shadeWhite  = vec3f(0.99, 0.88, 0.90);
  var stamenGold  = vec3f(0.92, 0.78, 0.35);

  if (season > 0.5 && season < 1.5) {
    // Summer - the few remaining flowers are tiny cream/white
    shadeDeep   = vec3f(0.92, 0.90, 0.82);
    shadeMedium = vec3f(0.95, 0.93, 0.86);
    shadeLight  = vec3f(0.97, 0.95, 0.90);
    shadePale   = vec3f(0.98, 0.97, 0.94);
    shadeBlush  = vec3f(0.96, 0.94, 0.88);
    shadeWhite  = vec3f(0.99, 0.98, 0.96);
    stamenGold  = vec3f(0.88, 0.82, 0.35);
  } else if (season > 1.5 && season < 2.5) {
    // Autumn - no flowers, but "petals" become extra leaf colors
    shadeDeep   = vec3f(0.70, 0.15, 0.05);
    shadeMedium = vec3f(0.82, 0.28, 0.08);
    shadeLight  = vec3f(0.92, 0.48, 0.12);
    shadePale   = vec3f(0.95, 0.65, 0.22);
    shadeBlush  = vec3f(0.88, 0.38, 0.10);
    shadeWhite  = vec3f(0.95, 0.78, 0.35);
    stamenGold  = vec3f(0.80, 0.60, 0.15);
  } else if (season > 2.5) {
    // Winter - sparse pale frost buds
    shadeDeep   = vec3f(0.72, 0.75, 0.80);
    shadeMedium = vec3f(0.82, 0.84, 0.88);
    shadeLight  = vec3f(0.90, 0.92, 0.95);
    shadePale   = vec3f(0.95, 0.96, 0.98);
    shadeBlush  = vec3f(0.85, 0.87, 0.92);
    shadeWhite  = vec3f(0.97, 0.98, 0.99);
    stamenGold  = vec3f(0.70, 0.68, 0.60);
  }

  // \u2500\u2500 Compute base color \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  var baseColor = vec3f(0.0);

  if (isLeaf > 0.5) {
    let leafTier = fract(seed * 5.17);
    var leafBase: vec3f;
    var leafTip: vec3f;
    if (leafTier < 0.35) {
      leafBase = leafDark;
      leafTip = leafMedium;
    } else if (leafTier < 0.6) {
      leafBase = leafMedium;
      leafTip = leafLight;
    } else if (leafTier < 0.85) {
      leafBase = leafOlive;
      leafTip = leafLight;
    } else {
      leafBase = leafDark;
      leafTip = leafOlive;
    }
    baseColor = mix(leafBase, leafTip, t);
  } else if (input.isCenter > 0.5) {
    // Stamen visible only in spring; blend to leaf color otherwise
    let goldVar = fract(seed * 13.3) * 0.15;
    let goldColor = stamenGold * (0.9 + goldVar);
    let centerLeaf = mix(leafDark, leafMedium, fract(seed * 5.17));
    baseColor = mix(goldColor, centerLeaf, min(season, 1.0));
  } else {
    // In summer/autumn, even petal geometry uses leaf colors (no flowers exist)
    if (season > 0.5 && season < 2.5) {
      let leafTier2 = fract(seed * 8.13);
      var lBase: vec3f;
      var lTip: vec3f;
      if (leafTier2 < 0.3) { lBase = leafDark; lTip = leafMedium; }
      else if (leafTier2 < 0.6) { lBase = leafMedium; lTip = leafLight; }
      else if (leafTier2 < 0.85) { lBase = leafOlive; lTip = leafLight; }
      else { lBase = leafDark; lTip = leafOlive; }
      baseColor = mix(lBase, lTip, t);
    } else {
      let tier = fract(seed * 7.31);
      var petalBase: vec3f;
      var petalTip: vec3f;
      if (tier < 0.2) {
        petalBase = shadeDeep;
        petalTip = shadeMedium;
      } else if (tier < 0.35) {
        petalBase = shadeMedium;
        petalTip = shadeLight;
      } else if (tier < 0.50) {
        petalBase = shadeLight;
        petalTip = shadePale;
      } else if (tier < 0.65) {
        petalBase = shadeBlush;
        petalTip = shadePale;
      } else if (tier < 0.80) {
        petalBase = shadePale;
        petalTip = shadeWhite;
      } else {
        petalBase = shadeDeep;
        petalTip = shadeBlush;
      }
      baseColor = mix(petalBase, petalTip, t);

      let veinT = abs(t - 0.5) * 2.0;
      let veinDarken = 1.0 - (1.0 - veinT) * 0.08;
      baseColor = baseColor * veinDarken;
    }
  }

  // Neutral directional light - no warm tint
  let sunDir = normalize(vec3f(-0.4, 0.85, -0.3));
  let sunColor = vec3f(1.20, 1.20, 1.20);
  let ambient = vec3f(0.28, 0.28, 0.30);
  let NdotL = max(dot(N, sunDir), 0.0);

  // Subsurface scattering - warm pink glow through petals
  let NdotLBack = max(dot(-N, sunDir), 0.0);
  let sssColor = mix(vec3f(1.0, 0.55, 0.65), vec3f(0.6, 0.8, 0.4), isLeaf);
  let subsurface = NdotLBack * 0.22 * sssColor;

  // Sky fill - warm tinted
  let skyFill = vec3f(0.90, 0.85, 0.88);
  let skyContrib = max(N.y, 0.0) * 0.12 * skyFill;

  // Depth-based darkening - flowers deeper inside canopy (facing down/inward) are darker
  // Combines underside darkening + seed-based depth variation
  let depthDarken = mix(0.92, 1.0, fract(seed * 11.3)); // per-flower depth variation
  let undersideDarken = mix(0.55, 1.0, max(N.y, 0.0)) * depthDarken;

  // Rim light - warm edge glow
  let viewDir = normalize(vec3f(0.4, 0.6, 0.7));
  let rimDot = 1.0 - max(dot(N, viewDir), 0.0);
  let rim = pow(rimDot, 3.0) * 0.10 * vec3f(1.0, 0.85, 0.88);

  let lit = baseColor * undersideDarken * (ambient + sunColor * NdotL * 0.88) + subsurface + skyContrib + rim;

  let hdr = acesFilm(lit * 1.05);
  var ldr = pow(hdr, vec3f(1.0 / 2.2));

  // Saturation boost - vivid colors
  let gray = dot(ldr, vec3f(0.299, 0.587, 0.114));
  ldr = mix(vec3f(gray), ldr, 1.6);

  return vec4f(ldr, 1.0);
}
`,me=`
${A}

struct BranchOutput {
  @builtin(position) position: vec4f,
  @location(0) normalX: f32,
  @location(1) normalY: f32,
  @location(2) normalZ: f32,
  @location(3) depth: f32,
  @location(4) vSeed: f32,
  @location(5) ringT: f32,
}

@group(0) @binding(0) var<uniform> uniforms: Uniforms;
@group(0) @binding(1) var<storage, read> branchData: array<vec4f>;

const VERTS_PER_SEG: u32 = 48u;
const RADIAL: u32 = 8u;
const PI: f32 = 3.14159265;

@vertex
fn main(@builtin(vertex_index) vertexIndex: u32) -> BranchOutput {
  var output: BranchOutput;

  let segIdx = vertexIndex / VERTS_PER_SEG;
  let localVert = vertexIndex % VERTS_PER_SEG;

  let segCount = u32(uniforms.blockCount); // reuse blockCount uniform for segment count
  if (segIdx >= segCount) {
    output.position = vec4f(0.0, 0.0, -10.0, 1.0);
    return output;
  }

  // Read segment data (3 vec4f per segment)
  let startData = branchData[segIdx * 3u + 0u];
  let endData   = branchData[segIdx * 3u + 1u];
  let segMeta   = branchData[segIdx * 3u + 2u];

  let startPos = startData.xyz;
  let startR   = startData.w;
  let endPos   = endData.xyz;
  let endR     = endData.w;
  let depth    = segMeta.x;
  let seed     = segMeta.y;

  output.depth = depth;
  output.vSeed = seed;

  // Hide branches in 2D mode
  let progress = uniforms.progress;
  let branchVis = smoothstep(0.0, 0.4, 1.0 - progress);
  if (branchVis < 0.01) {
    output.position = vec4f(0.0, 0.0, -10.0, 1.0);
    return output;
  }

  // Which quad around the cylinder (0-7) and which triangle vertex (0-5)
  let quadIdx = localVert / 6u;
  let triVert = localVert % 6u;

  // Two angles for the quad edges
  let angle0 = f32(quadIdx) / f32(RADIAL) * 2.0 * PI;
  let angle1 = f32(quadIdx + 1u) / f32(RADIAL) * 2.0 * PI;

  // Determine which ring (bottom=0, top=1) and which angle
  var ringT: f32;
  var angle: f32;
  // Quad: two triangles - (b0,b1,t0) and (t0,b1,t1)
  if (triVert == 0u) { ringT = 0.0; angle = angle0; }
  else if (triVert == 1u) { ringT = 0.0; angle = angle1; }
  else if (triVert == 2u) { ringT = 1.0; angle = angle0; }
  else if (triVert == 3u) { ringT = 1.0; angle = angle0; }
  else if (triVert == 4u) { ringT = 0.0; angle = angle1; }
  else { ringT = 1.0; angle = angle1; }

  output.ringT = ringT;

  // Interpolate position and radius along the segment
  let pos = mix(startPos, endPos, ringT);
  let radius = mix(startR, endR, ringT) * branchVis;

  // Build local coordinate frame around the segment direction
  let dir = normalize(endPos - startPos);
  var refUp = vec3f(0.0, 1.0, 0.0);
  if (abs(dot(dir, refUp)) > 0.95) {
    refUp = vec3f(1.0, 0.0, 0.0);
  }
  let right = normalize(cross(dir, refUp));
  let up = normalize(cross(right, dir));

  // Wind - same direction as flowers/grass, scaled by branch depth (increased)
  let time = uniforms.time;
  let windAmount = min(depth / 4.0, 1.0) * 0.016 * branchVis;
  // Primary wind + turbulence matching flower shader
  let windBase = sin(time * 0.45 + pos.x * 15.0 + pos.z * 10.0) * windAmount;
  let windTurb = sin(time * 1.1 + pos.x * 40.0 + pos.z * 30.0) * windAmount * 0.25;
  let windOffX = windBase + windTurb;
  let windOffZ = sin(time * 0.35 + pos.z * 12.0 + pos.x * 8.0) * windAmount * 0.6;
  let windedPos = pos + vec3f(windOffX, 0.0, windOffZ);

  // Cylinder surface position
  let cx = cos(angle);
  let cy = sin(angle);
  let localPos = windedPos + right * cx * radius + up * cy * radius;

  // Normal
  let normal = normalize(right * cx + up * cy);
  output.normalX = normal.x;
  output.normalY = normal.y;
  output.normalZ = normal.z;

  // Camera transform (identical to blocks/flowers shader)
  let isoAngleY = mix(${te}, 0, progress) + uniforms.cameraBobX;
  let isoAngleX = mix(${E}, ${D}, progress) + uniforms.cameraBobY;

  let cosY = cos(isoAngleY); let sinY = sin(isoAngleY);
  let cosX = cos(isoAngleX); let sinX = sin(isoAngleX);

  let ry_x = localPos.x * cosY - localPos.z * sinY;
  let ry_z = localPos.x * sinY + localPos.z * cosY;
  let rx_y = localPos.y * cosX - ry_z * sinX;
  let rx_z = localPos.y * sinX + ry_z * cosX;

  let viewScale = mix(${ne}, ${re}, progress);
  let ar = uniforms.aspectRatio;
  let scaleX = viewScale / max(ar, 1.0);
  let scaleY = viewScale / max(1.0 / ar, 1.0);

  let yOffsetScene = mix(-0.16, ${ie}, progress);
  let xOffsetScene = mix(0.0, ${O}, progress);

  output.position = vec4f(
    (ry_x + xOffsetScene) * scaleX,
    (rx_y + yOffsetScene) * scaleY,
    rx_z * 0.01 + 0.5,
    1.0
  );

  return output;
}
`,he=`
${A}

struct BranchInput {
  @location(0) normalX: f32,
  @location(1) normalY: f32,
  @location(2) normalZ: f32,
  @location(3) depth: f32,
  @location(4) vSeed: f32,
  @location(5) ringT: f32,
}

@group(0) @binding(0) var<uniform> uniforms: Uniforms;

fn acesFilm(x: vec3f) -> vec3f {
  let a = 2.51; let b = 0.03; let c = 2.43; let d = 0.59; let e = 0.14;
  return clamp((x * (a * x + b)) / (x * (c * x + d) + e), vec3f(0.0), vec3f(1.0));
}

@fragment
fn main(input: BranchInput) -> @location(0) vec4f {
  let N = normalize(vec3f(input.normalX, input.normalY, input.normalZ));
  let depth = input.depth;
  let seed = input.vSeed;
  let t = input.ringT;

  // Bark - deep chocolate brown like reference
  let barkBase  = vec3f(0.28, 0.16, 0.10);
  let barkLight = vec3f(0.40, 0.26, 0.18);
  let barkDark  = vec3f(0.16, 0.09, 0.05);
  let barkHighlight = vec3f(0.50, 0.34, 0.24); // sunlit edge

  // Trunk is darkest, tips get a warm highlight
  let depthT = min(depth / 5.0, 1.0);
  var bark = mix(barkBase, barkLight, depthT * 0.5);
  bark = mix(bark, barkHighlight, depthT * depthT * 0.2);

  // Procedural bark noise
  let noise1 = fract(sin(seed * 43.7 + depth * 17.3) * 43758.5);
  let noise2 = fract(sin(seed * 73.1 + depth * 31.1 + 127.1) * 43758.5);

  // Multi-frequency bark grooves - more visible surface detail
  let grooveAngle = fract(sin(seed * 127.1 + t * 31.1) * 43758.5) * 6.28;
  let groove1 = sin(grooveAngle * 8.0 + noise1 * 3.0) * 0.5 + 0.5;
  let groove2 = sin(grooveAngle * 14.0 + noise2 * 5.0 + 1.7) * 0.5 + 0.5;
  let groove3 = sin(grooveAngle * 22.0 + noise1 * 7.0) * 0.5 + 0.5;
  let grooveEffect = (groove1 * 0.5 + groove2 * 0.3 + groove3 * 0.2) * 0.18 + 0.82;

  // Ring pattern - horizontal bark bands
  let ring = sin(t * 18.0 + noise2 * 6.0) * 0.07 + 0.93;

  // Knot detail - occasional dark spots
  let knotNoise = sin(seed * 47.3 + t * 13.0 + noise1 * 8.0);
  let knot = smoothstep(0.88, 0.95, knotNoise) * 0.10;

  // Color variation
  let colorShift = (noise1 - 0.5) * 0.12;
  bark = bark * (1.0 + colorShift) * grooveEffect * ring - knot;

  // Lighting
  let sunDir = normalize(vec3f(-0.4, 0.85, -0.3));
  let sunCol = vec3f(1.20, 1.20, 1.20);
  let ambient = vec3f(0.25, 0.25, 0.28);
  let NdotL = max(dot(N, sunDir), 0.0);

  // Subsurface for thinner branches
  let NdotLBack = max(dot(-N, sunDir), 0.0);
  let sss = NdotLBack * depthT * 0.06 * vec3f(0.6, 0.3, 0.2);

  // Sky fill
  let skyFill = vec3f(0.85, 0.80, 0.90);
  let skyContrib = max(N.y, 0.0) * 0.08 * skyFill;

  // Ambient occlusion: thicker branches are slightly darker at base
  let ao = 0.75 + depthT * 0.25;

  let lit = bark * (ambient + sunCol * NdotL * 0.82) * ao + sss + skyContrib;

  let hdr = acesFilm(lit * 1.05);
  var ldr = pow(hdr, vec3f(1.0 / 2.2));

  let gray = dot(ldr, vec3f(0.299, 0.587, 0.114));
  ldr = mix(vec3f(gray), ldr, 1.25);

  return vec4f(ldr, 1.0);
}
`,ge=`
${A}

struct GrassOutput {
  @builtin(position) position: vec4f,
  @location(0) greenT: f32,
  @location(1) normalY: f32,
  @location(2) seed: f32,
}

@group(0) @binding(0) var<uniform> uniforms: Uniforms;
@group(0) @binding(1) var<storage, read> grassData: array<vec4f>;

const PI: f32 = 3.14159265;

@vertex
fn main(@builtin(vertex_index) vertexIndex: u32) -> GrassOutput {
  var output: GrassOutput;

  let bladeIdx = vertexIndex / 3u;
  let vertIdx = vertexIndex % 3u;

  let grassCount = u32(uniforms.blockCount);
  if (bladeIdx >= grassCount) {
    output.position = vec4f(0.0, 0.0, -10.0, 1.0);
    return output;
  }

  // Hide grass in 2D mode
  let progress = uniforms.progress;
  let vis = smoothstep(0.0, 0.3, 1.0 - progress);
  if (vis < 0.01) {
    output.position = vec4f(0.0, 0.0, -10.0, 1.0);
    return output;
  }

  let data = grassData[bladeIdx];
  let col = data.x;
  let row = data.y;
  let seed = data.z;
  let bladeHeight = data.w * vis;

  output.seed = seed;

  let blockSize = f32(${S});
  let gridSize = uniforms.gridSize;
  let halfGrid = gridSize * blockSize * 0.5;

  let baseX = col * blockSize - halfGrid;
  let baseY = 0.0; // ground level
  let baseZ = row * blockSize - halfGrid;

  // Random rotation angle per blade
  let angle = seed * PI * 2.0;
  let cosA = cos(angle);
  let sinA = sin(angle);

  // Blade dimensions - wider for better coverage
  let halfWidth = blockSize * 0.22;

  var localPos = vec3f(0.0);

  // Subtle tilt + gentle wind on tips only
  let tiltX = (seed - 0.5) * 0.4;
  let tiltZ = (fract(seed * 7.13) - 0.5) * 0.4;
  let time = uniforms.time;
  // Wind - very gentle sway
  let windBase = sin(time * 0.45 + col * 0.25 + row * 0.15) * 0.02;
  let windTurb = sin(time * 1.1 + col * 0.8 + row * 0.6) * 0.005;
  let windX = windBase + windTurb;
  let windZ = sin(time * 0.35 + col * 0.15 + row * 0.25) * 0.012;
  let tipOffX = (tiltX + windX) * bladeHeight * 4.0;
  let tipOffZ = (tiltZ + windZ) * bladeHeight * 4.0;

  // Y offset: grass sits on top of the ground block
  let yLift = blockSize * 1.0;

  if (vertIdx == 0u) {
    // Base left
    localPos = vec3f(baseX - halfWidth * cosA, baseY + yLift, baseZ - halfWidth * sinA);
    output.greenT = 0.0;
    output.normalY = 0.3;
  } else if (vertIdx == 1u) {
    // Base right
    localPos = vec3f(baseX + halfWidth * cosA, baseY + yLift, baseZ + halfWidth * sinA);
    output.greenT = 0.0;
    output.normalY = 0.3;
  } else {
    // Tip - tilted outward with curl for natural droop
    let curlDroop = bladeHeight * seed * 0.15; // taller blades droop more
    localPos = vec3f(baseX + tipOffX, baseY + yLift + bladeHeight - curlDroop, baseZ + tipOffZ);
    output.greenT = 1.0;
    output.normalY = 0.9;
  }

  // Camera transform
  let isoAngleY = mix(${te}, 0, progress) + uniforms.cameraBobX;
  let isoAngleX = mix(${E}, ${D}, progress) + uniforms.cameraBobY;

  let cosY = cos(isoAngleY); let sinY = sin(isoAngleY);
  let cosX = cos(isoAngleX); let sinX = sin(isoAngleX);

  let ry_x = localPos.x * cosY - localPos.z * sinY;
  let ry_z = localPos.x * sinY + localPos.z * cosY;
  let rx_y = localPos.y * cosX - ry_z * sinX;
  let rx_z = localPos.y * sinX + ry_z * cosX;

  let viewScale = mix(${ne}, ${re}, progress);
  let ar = uniforms.aspectRatio;
  let scaleX = viewScale / max(ar, 1.0);
  let scaleY = viewScale / max(1.0 / ar, 1.0);

  let yOffsetScene = mix(-0.16, ${ie}, progress);
  let xOffsetScene = mix(0.0, ${O}, progress);

  output.position = vec4f(
    (ry_x + xOffsetScene) * scaleX,
    (rx_y + yOffsetScene) * scaleY,
    rx_z * 0.01 + 0.5,
    1.0
  );

  return output;
}
`,_e=`
${A}

struct GrassInput {
  @location(0) greenT: f32,
  @location(1) normalY: f32,
  @location(2) seed: f32,
}

@group(0) @binding(0) var<uniform> uniforms: Uniforms;

fn acesFilm(x: vec3f) -> vec3f {
  let a = 2.51; let b = 0.03; let c = 2.43; let d = 0.59; let e = 0.14;
  return clamp((x * (a * x + b)) / (x * (c * x + d) + e), vec3f(0.0), vec3f(1.0));
}

@fragment
fn main(input: GrassInput) -> @location(0) vec4f {
  let season = uniforms.season;

  // \u2500\u2500 Grass base palette (overridden per season) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  var darkGreen  = vec3f(0.12, 0.32, 0.06);
  var midGreen   = vec3f(0.22, 0.48, 0.12);
  var lightGreen = vec3f(0.35, 0.58, 0.20);
  var coralPink  = vec3f(0.65, 0.28, 0.30);
  var dustyRose  = vec3f(0.55, 0.32, 0.28);
  var mossGreen  = vec3f(0.30, 0.40, 0.15);
  var yellowFlower = vec3f(0.75, 0.68, 0.20);
  var whiteFlower = vec3f(0.88, 0.86, 0.78);
  var lavender = vec3f(0.55, 0.42, 0.62);

  if (season > 0.5 && season < 1.5) {
    // Summer - lush vibrant greens, no pink
    darkGreen  = vec3f(0.08, 0.35, 0.04);
    midGreen   = vec3f(0.18, 0.52, 0.10);
    lightGreen = vec3f(0.30, 0.65, 0.18);
    mossGreen  = vec3f(0.25, 0.45, 0.12);
    coralPink  = vec3f(0.28, 0.50, 0.15);  // replace pink with more green
    dustyRose  = vec3f(0.22, 0.42, 0.12);
    yellowFlower = vec3f(0.70, 0.72, 0.22);
    whiteFlower = vec3f(0.82, 0.88, 0.72);
    lavender = vec3f(0.35, 0.55, 0.25);
  } else if (season > 1.5 && season < 2.5) {
    // Autumn - dry golden, brown, burnt orange grass
    darkGreen  = vec3f(0.40, 0.30, 0.10);
    midGreen   = vec3f(0.55, 0.40, 0.12);
    lightGreen = vec3f(0.70, 0.52, 0.18);
    mossGreen  = vec3f(0.48, 0.35, 0.10);
    coralPink  = vec3f(0.65, 0.32, 0.12);
    dustyRose  = vec3f(0.58, 0.35, 0.15);
    yellowFlower = vec3f(0.80, 0.62, 0.18);
    whiteFlower = vec3f(0.78, 0.72, 0.55);
    lavender = vec3f(0.55, 0.38, 0.22);
  } else if (season > 2.5) {
    // Winter - sparse, frost-tinted, muted brown/gray
    darkGreen  = vec3f(0.32, 0.30, 0.25);
    midGreen   = vec3f(0.42, 0.40, 0.32);
    lightGreen = vec3f(0.52, 0.50, 0.42);
    mossGreen  = vec3f(0.38, 0.36, 0.28);
    coralPink  = vec3f(0.45, 0.38, 0.32);
    dustyRose  = vec3f(0.40, 0.35, 0.30);
    yellowFlower = vec3f(0.55, 0.50, 0.38);
    whiteFlower = vec3f(0.75, 0.75, 0.72);
    lavender = vec3f(0.48, 0.45, 0.48);
  }

  let tier = fract(input.seed * 7.31);
  var baseColor: vec3f;
  var tipColor: vec3f;
  if (tier < 0.22) {
    baseColor = darkGreen;
    tipColor = midGreen;
  } else if (tier < 0.42) {
    baseColor = midGreen;
    tipColor = lightGreen;
  } else if (tier < 0.55) {
    baseColor = mossGreen;
    tipColor = lightGreen;
  } else if (tier < 0.68) {
    baseColor = dustyRose;
    tipColor = coralPink;
  } else if (tier < 0.76) {
    baseColor = coralPink;
    tipColor = vec3f(0.72, 0.35, 0.35);
  } else if (tier < 0.84) {
    baseColor = midGreen;
    tipColor = yellowFlower;
  } else if (tier < 0.92) {
    baseColor = mossGreen;
    tipColor = whiteFlower;
  } else {
    baseColor = dustyRose;
    tipColor = lavender;
  }

  let color = mix(baseColor, tipColor, input.greenT);

  // Warm lighting - strong sun for grass vibrancy
  let sunDir = normalize(vec3f(-0.4, 0.85, -0.3));
  let N = normalize(vec3f(0.0, input.normalY, 0.3));
  let NdotL = max(dot(N, sunDir), 0.0);
  let ambient = vec3f(0.22, 0.24, 0.18);
  let sunCol = vec3f(1.20, 1.20, 1.20);

  let lit = color * (ambient + sunCol * NdotL * 0.85);

  let hdr = acesFilm(lit * 1.1);
  var ldr = pow(hdr, vec3f(1.0 / 2.2));

  let gray = dot(ldr, vec3f(0.299, 0.587, 0.114));
  ldr = mix(vec3f(gray), ldr, 1.6);

  return vec4f(ldr, 1.0);
}
`,ve=`
${A}

struct FlowerOutput {
  @builtin(position) position: vec4f,
  @location(0) petalT: f32,
  @location(1) normalX: f32,
  @location(2) normalY: f32,
  @location(3) normalZ: f32,
  @location(4) seed: f32,
  @location(5) isCenter: f32,
}

@group(0) @binding(0) var<uniform> uniforms: Uniforms;
@group(0) @binding(1) var<storage, read> petalData: array<vec4f>;

const PI: f32 = 3.14159265;

@vertex
fn main(@builtin(vertex_index) vertexIndex: u32) -> FlowerOutput {
  var output: FlowerOutput;

  let vertsPerFlower = 150u;
  let flowerIdx = vertexIndex / vertsPerFlower;
  let localVert = vertexIndex % vertsPerFlower;

  let petalCount = u32(uniforms.blockCount);
  if (flowerIdx >= petalCount) {
    output.position = vec4f(0.0, 0.0, -10.0, 1.0);
    return output;
  }

  // Hide in 2D mode
  let progress = uniforms.progress;
  let vis = smoothstep(0.0, 0.4, 1.0 - progress);
  if (vis < 0.01) {
    output.position = vec4f(0.0, 0.0, -10.0, 1.0);
    return output;
  }

  let data = petalData[flowerIdx];
  let col = data.x;
  let row = data.y;
  let topY = data.z;
  let seed = data.w;
  output.seed = seed;

  let blockSize = f32(${S});
  let gridSize = uniforms.gridSize;
  let halfGrid = gridSize * blockSize * 0.5;
  let time = uniforms.time;

  // \u2500\u2500 Falling animation \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  // Continuous looping fall. Each flower has a different period and phase.
  let cyclePeriod = 8.0 + seed * 6.0;
  let phaseOffset = seed * 100.0;
  // Use fract-based cycling instead of % to avoid precision issues
  let rawCycle = (time + phaseOffset) / cyclePeriod;
  let cycleT = fract(rawCycle);

  // Always visible during fall, brief reset at cycle boundary
  let fadeIn = smoothstep(0.0, 0.05, cycleT);
  let fadeOut = 1.0 - smoothstep(0.95, 1.0, cycleT);
  let fallVis = fadeIn * fadeOut * vis;

  if (fallVis < 0.01) {
    output.position = vec4f(0.0, 0.0, -10.0, 1.0);
    return output;
  }

  // Fall progress (0 = origin, 1 = ground)
  let fallT = cycleT;
  let groundY = blockSize * 1.5;
  let fallHeight = mix(topY, groundY, fallT);

  // Origin in world space
  let originX = col * blockSize - halfGrid;
  let originZ = row * blockSize - halfGrid;

  // Horizontal drift - sinusoidal wobble matching wind direction
  let driftX = sin(time * 0.45 + seed * 5.0) * 0.045 * fallT
             + sin(time * 1.1 + seed * 12.0) * 0.012 * fallT;
  let driftZ = sin(time * 0.35 + seed * 8.0) * 0.03 * fallT
             + cos(time * 0.8 + seed * 3.0) * 0.01 * fallT;

  // Animated flower center position
  let centerX = originX + driftX;
  let centerY = fallHeight;
  let centerZ = originZ + driftZ;

  // \u2500\u2500 Flower geometry \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  let flowerScale = blockSize * (0.5 + seed * 0.3) * fallVis;
  let petalLength = flowerScale * 0.85;
  let petalWidth = flowerScale * 0.38;
  let curlHeight = blockSize * 0.15 * fallVis;
  let centerRadius = blockSize * 0.10 * fallVis;

  // Per-flower base rotation + tumbling from fall
  let baseRotation = seed * 6.28318 + time * (0.8 + seed * 1.2);

  // Tumbling tilt - increases as flower falls
  let tiltAngle = 0.3 + fallT * 1.2 + sin(time * 0.9 + seed * 7.0) * 0.4;
  let tiltDir = time * (0.5 + seed * 0.8) + seed * PI * 2.0;
  let tiltCos = cos(tiltAngle);
  let tiltSin = sin(tiltAngle);
  let tiltAxisX = cos(tiltDir);
  let tiltAxisZ = sin(tiltDir);

  var localPos = vec3f(0.0);
  var normal = vec3f(0.0, 1.0, 0.0);
  output.isCenter = 0.0;
  output.petalT = 0.0;

  if (localVert < 120u) {
    // ===== PETAL GEOMETRY (identical to flowers shader) =====
    let petalIdx = localVert / 24u;
    let segVert = localVert % 24u;
    let segIdx = segVert / 6u;
    let triVert = segVert % 6u;

    let petalAngle = f32(petalIdx) * 1.25664 + baseRotation;
    let cosA = cos(petalAngle);
    let sinA = sin(petalAngle);

    var rowIdx: u32;
    var side: f32;
    if (triVert == 0u) { rowIdx = segIdx;     side = -1.0; }
    else if (triVert == 1u) { rowIdx = segIdx;     side =  1.0; }
    else if (triVert == 2u) { rowIdx = segIdx + 1u; side = -1.0; }
    else if (triVert == 3u) { rowIdx = segIdx + 1u; side = -1.0; }
    else if (triVert == 4u) { rowIdx = segIdx;     side =  1.0; }
    else { rowIdx = segIdx + 1u; side =  1.0; }

    let t = f32(rowIdx) * 0.25;
    output.petalT = t;

    let dist = t * petalLength;
    let hw = petalWidth * sin(t * 3.14159) * sqrt(1.0 - t * 0.3);
    let curl = curlHeight * 4.0 * t * (1.0 - t);

    let alongX = dist * cosA;
    let alongZ = dist * sinA;
    let perpX = side * hw * (-sinA);
    let perpZ = side * hw * cosA;

    localPos = vec3f(alongX + perpX, curl, alongZ + perpZ);

    let curlSlope = curlHeight * 4.0 * (1.0 - 2.0 * t);
    normal = normalize(vec3f(
      -curlSlope * cosA + side * 0.2 * sinA,
      1.0,
      -curlSlope * sinA - side * 0.2 * cosA,
    ));
  } else {
    // ===== CENTER DISK =====
    output.isCenter = 1.0;
    let diskVert = localVert - 120u;
    let triIdx = diskVert / 3u;
    let triV = diskVert % 3u;

    let centerElevation = curlHeight * 0.8;

    if (triV == 0u) {
      localPos = vec3f(0.0, centerElevation, 0.0);
      normal = vec3f(0.0, 1.0, 0.0);
    } else {
      let angleIdx = select(triIdx, triIdx + 1u, triV == 2u);
      let diskAngle = f32(angleIdx) * 0.62832 + baseRotation;
      localPos = vec3f(cos(diskAngle) * centerRadius, centerElevation * 0.9, sin(diskAngle) * centerRadius);
      normal = vec3f(0.0, 1.0, 0.0);
    }
  }

  // \u2500\u2500 Apply tumbling tilt (Rodrigues rotation) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  let dotAO = tiltAxisX * localPos.x + tiltAxisZ * localPos.z;
  let crossX = -tiltAxisZ * localPos.y;
  let crossY = tiltAxisZ * localPos.x - tiltAxisX * localPos.z;
  let crossZ = tiltAxisX * localPos.y;

  let rotX = localPos.x * tiltCos + crossX * tiltSin + tiltAxisX * dotAO * (1.0 - tiltCos);
  let rotY = localPos.y * tiltCos + crossY * tiltSin;
  let rotZ = localPos.z * tiltCos + crossZ * tiltSin + tiltAxisZ * dotAO * (1.0 - tiltCos);

  localPos = vec3f(centerX + rotX, centerY + rotY, centerZ + rotZ);

  // Rotate normal too
  let nDotA = tiltAxisX * normal.x + tiltAxisZ * normal.z;
  let nCrossX = -tiltAxisZ * normal.y;
  let nCrossY = tiltAxisZ * normal.x - tiltAxisX * normal.z;
  let nCrossZ = tiltAxisX * normal.y;
  normal = normalize(vec3f(
    normal.x * tiltCos + nCrossX * tiltSin + tiltAxisX * nDotA * (1.0 - tiltCos),
    normal.y * tiltCos + nCrossY * tiltSin,
    normal.z * tiltCos + nCrossZ * tiltSin + tiltAxisZ * nDotA * (1.0 - tiltCos),
  ));

  output.normalX = normal.x;
  output.normalY = normal.y;
  output.normalZ = normal.z;

  // \u2500\u2500 Camera transform \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  let isoAngleY = mix(${te}, 0, progress) + uniforms.cameraBobX;
  let isoAngleX = mix(${E}, ${D}, progress) + uniforms.cameraBobY;

  let cy = cos(isoAngleY); let sy = sin(isoAngleY);
  let cx = cos(isoAngleX); let sx = sin(isoAngleX);

  let ry_x = localPos.x * cy - localPos.z * sy;
  let ry_z = localPos.x * sy + localPos.z * cy;
  let rx_y = localPos.y * cx - ry_z * sx;
  let rx_z = localPos.y * sx + ry_z * cx;

  let viewScale = mix(${ne}, ${re}, progress);
  let ar = uniforms.aspectRatio;
  let scaleX = viewScale / max(ar, 1.0);
  let scaleY = viewScale / max(1.0 / ar, 1.0);

  let yOffsetScene = mix(-0.16, ${ie}, progress);
  let xOffsetScene = mix(0.0, ${O}, progress);

  output.position = vec4f(
    (ry_x + xOffsetScene) * scaleX,
    (rx_y + yOffsetScene) * scaleY,
    rx_z * 0.01 + 0.5,
    1.0
  );
  return output;
}
`,ye=`
${A}

struct FlowerInput {
  @location(0) petalT: f32,
  @location(1) normalX: f32,
  @location(2) normalY: f32,
  @location(3) normalZ: f32,
  @location(4) seed: f32,
  @location(5) isCenter: f32,
}

@group(0) @binding(0) var<uniform> uniforms: Uniforms;

fn acesFilm(x: vec3f) -> vec3f {
  let a = 2.51; let b = 0.03; let c = 2.43; let d = 0.59; let e = 0.14;
  return clamp((x * (a * x + b)) / (x * (c * x + d) + e), vec3f(0.0), vec3f(1.0));
}

@fragment
fn main(input: FlowerInput) -> @location(0) vec4f {
  let N = normalize(vec3f(input.normalX, input.normalY, input.normalZ));
  let t = input.petalT;
  let seed = input.seed;

  // Season-based palette (matches canopy flowers)
  let season = uniforms.season;

  let fallChance = fract(seed * 4.37);
  // Summer: nothing falls
  if (season > 0.5 && season < 1.5) { discard; }

  // Winter: render as snow - all white, show all particles
  if (season > 2.5) {
    let snowWhite = vec3f(0.95, 0.96, 0.98);
    let snowLit = snowWhite * (0.85 + max(dot(N, normalize(vec3f(-0.4, 0.85, -0.3))), 0.0) * 0.15);
    let snowHdr = pow(snowLit, vec3f(1.0 / 2.2));
    return vec4f(snowHdr, 1.0);
  }

  var shadeDeep    = vec3f(0.85, 0.22, 0.38);
  var shadeMedium  = vec3f(0.92, 0.40, 0.52);
  var shadeLight   = vec3f(0.96, 0.58, 0.66);
  var shadePale    = vec3f(0.98, 0.75, 0.80);
  var shadeBlush   = vec3f(0.97, 0.65, 0.72);
  var shadeWhite   = vec3f(0.99, 0.88, 0.90);
  var stamenGold   = vec3f(0.92, 0.78, 0.35);

  if (season > 0.5 && season < 1.5) {
    // Summer - falling green leaves
    shadeDeep = vec3f(0.15, 0.40, 0.10); shadeMedium = vec3f(0.25, 0.52, 0.18);
    shadeLight = vec3f(0.38, 0.62, 0.25); shadePale = vec3f(0.48, 0.68, 0.32);
    shadeBlush = vec3f(0.30, 0.55, 0.20); shadeWhite = vec3f(0.55, 0.72, 0.38);
    stamenGold = vec3f(0.55, 0.60, 0.22);
  } else if (season > 1.5 && season < 2.5) {
    // Autumn - falling orange/red leaves
    shadeDeep = vec3f(0.70, 0.15, 0.05); shadeMedium = vec3f(0.82, 0.28, 0.08);
    shadeLight = vec3f(0.92, 0.48, 0.12); shadePale = vec3f(0.95, 0.65, 0.22);
    shadeBlush = vec3f(0.88, 0.38, 0.10); shadeWhite = vec3f(0.95, 0.78, 0.35);
    stamenGold = vec3f(0.80, 0.60, 0.15);
  } else if (season > 2.5) {
    // Winter - sparse pale flakes
    shadeDeep = vec3f(0.78, 0.80, 0.85); shadeMedium = vec3f(0.85, 0.87, 0.90);
    shadeLight = vec3f(0.92, 0.93, 0.96); shadePale = vec3f(0.95, 0.96, 0.98);
    shadeBlush = vec3f(0.88, 0.90, 0.94); shadeWhite = vec3f(0.97, 0.98, 0.99);
    stamenGold = vec3f(0.75, 0.74, 0.70);
  }

  var baseColor = vec3f(0.0);

  if (input.isCenter > 0.5) {
    let goldVar = fract(seed * 13.3) * 0.15;
    baseColor = stamenGold * (0.9 + goldVar);
  } else {
    let tier = fract(seed * 7.31);
    var petalBase: vec3f;
    var petalTip: vec3f;
    if (tier < 0.2) {
      petalBase = shadeDeep;
      petalTip = shadeMedium;
    } else if (tier < 0.35) {
      petalBase = shadeMedium;
      petalTip = shadeLight;
    } else if (tier < 0.50) {
      petalBase = shadeLight;
      petalTip = shadePale;
    } else if (tier < 0.65) {
      petalBase = shadeBlush;
      petalTip = shadePale;
    } else if (tier < 0.80) {
      petalBase = shadePale;
      petalTip = shadeWhite;
    } else {
      petalBase = shadeDeep;
      petalTip = shadeBlush;
    }
    baseColor = mix(petalBase, petalTip, t);

    let veinT = abs(t - 0.5) * 2.0;
    let veinDarken = 1.0 - (1.0 - veinT) * 0.08;
    baseColor = baseColor * veinDarken;
  }

  // Neutral directional light - no warm tint
  let sunDir = normalize(vec3f(-0.4, 0.85, -0.3));
  let sunColor = vec3f(1.20, 1.20, 1.20);
  let ambient = vec3f(0.28, 0.28, 0.30);
  let NdotL = max(dot(N, sunDir), 0.0);

  let NdotLBack = max(dot(-N, sunDir), 0.0);
  let sssColor = vec3f(1.0, 0.55, 0.65);
  let subsurface = NdotLBack * 0.22 * sssColor;

  let skyFill = vec3f(0.90, 0.85, 0.88);
  let skyContrib = max(N.y, 0.0) * 0.12 * skyFill;

  let undersideDarken = mix(0.55, 1.0, max(N.y, 0.0));

  let viewDir = normalize(vec3f(0.4, 0.6, 0.7));
  let rimDot = 1.0 - max(dot(N, viewDir), 0.0);
  let rim = pow(rimDot, 3.0) * 0.10 * vec3f(1.0, 0.85, 0.88);

  let lit = baseColor * undersideDarken * (ambient + sunColor * NdotL * 0.88) + subsurface + skyContrib + rim;

  let hdr = acesFilm(lit * 1.05);
  var ldr = pow(hdr, vec3f(1.0 / 2.2));

  let gray = dot(ldr, vec3f(0.299, 0.587, 0.114));
  ldr = mix(vec3f(gray), ldr, 1.6);

  return vec4f(ldr, 1.0);
}
`,be=o((Y,$)=>{$.exports=function(){return typeof Promise=="function"&&Promise.prototype&&Promise.prototype.then}}),xe=o(Y=>{var $,q=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];Y.getSymbolSize=function(G){if(!G)throw Error('"version" cannot be null or undefined');if(G<1||G>40)throw Error('"version" should be in range from 1 to 40');return G*4+17},Y.getSymbolTotalCodewords=function(G){return q[G]},Y.getBCHDigit=function(G){let X=0;for(;G!==0;)X++,G>>>=1;return X},Y.setToSJISFunction=function(G){if(typeof G!="function")throw Error('"toSJISFunc" is not a valid function.');$=G},Y.isKanjiModeEnabled=function(){return $!==void 0},Y.toSJIS=function(G){return $(G)}}),Se=o(Y=>{Y.L={bit:1},Y.M={bit:0},Y.Q={bit:3},Y.H={bit:2};function $(q){if(typeof q!="string")throw Error("Param is not a string");switch(q.toLowerCase()){case"l":case"low":return Y.L;case"m":case"medium":return Y.M;case"q":case"quartile":return Y.Q;case"h":case"high":return Y.H;default:throw Error("Unknown EC Level: "+q)}}Y.isValid=function(q){return q&&q.bit!==void 0&&q.bit>=0&&q.bit<4},Y.from=function(q,G){if(Y.isValid(q))return q;try{return $(q)}catch{return G}}}),Ce=o((Y,$)=>{function q(){this.buffer=[],this.length=0}q.prototype={get:function(G){let X=Math.floor(G/8);return(this.buffer[X]>>>7-G%8&1)==1},put:function(G,X){for(let H=0;H<X;H++)this.putBit((G>>>X-H-1&1)==1)},getLengthInBits:function(){return this.length},putBit:function(G){let X=Math.floor(this.length/8);this.buffer.length<=X&&this.buffer.push(0),G&&(this.buffer[X]|=128>>>this.length%8),this.length++}},$.exports=q}),we=o((Y,$)=>{function q(G){if(!G||G<1)throw Error("BitMatrix size must be defined and greater than 0");this.size=G,this.data=new Uint8Array(G*G),this.reservedBit=new Uint8Array(G*G)}q.prototype.set=function(G,X,H,Z){let Q=G*this.size+X;this.data[Q]=H,Z&&(this.reservedBit[Q]=!0)},q.prototype.get=function(G,X){return this.data[G*this.size+X]},q.prototype.xor=function(G,X,H){this.data[G*this.size+X]^=H},q.prototype.isReserved=function(G,X){return this.reservedBit[G*this.size+X]},$.exports=q}),Te=o(Y=>{var $=xe().getSymbolSize;Y.getRowColCoords=function(q){if(q===1)return[];let G=Math.floor(q/7)+2,X=$(q),H=X===145?26:Math.ceil((X-13)/(2*G-2))*2,Z=[X-7];for(let Q=1;Q<G-1;Q++)Z[Q]=Z[Q-1]-H;return Z.push(6),Z.reverse()},Y.getPositions=function(q){let G=[],X=Y.getRowColCoords(q),H=X.length;for(let Z=0;Z<H;Z++)for(let Q=0;Q<H;Q++)Z===0&&Q===0||Z===0&&Q===H-1||Z===H-1&&Q===0||G.push([X[Z],X[Q]]);return G}}),Ee=o(Y=>{var $=xe().getSymbolSize,q=7;Y.getPositions=function(G){let X=$(G);return[[0,0],[X-q,0],[0,X-q]]}}),De=o(Y=>{Y.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};var $={N1:3,N2:3,N3:40,N4:10};Y.isValid=function(G){return G!=null&&G!==""&&!isNaN(G)&&G>=0&&G<=7},Y.from=function(G){return Y.isValid(G)?parseInt(G,10):void 0},Y.getPenaltyN1=function(G){let X=G.size,H=0,Z=0,Q=0,pt=null,ft=null;for(let ht=0;ht<X;ht++){Z=Q=0,pt=ft=null;for(let kt=0;kt<X;kt++){let mt=G.get(ht,kt);mt===pt?Z++:(Z>=5&&(H+=$.N1+(Z-5)),pt=mt,Z=1),mt=G.get(kt,ht),mt===ft?Q++:(Q>=5&&(H+=$.N1+(Q-5)),ft=mt,Q=1)}Z>=5&&(H+=$.N1+(Z-5)),Q>=5&&(H+=$.N1+(Q-5))}return H},Y.getPenaltyN2=function(G){let X=G.size,H=0;for(let Z=0;Z<X-1;Z++)for(let Q=0;Q<X-1;Q++){let pt=G.get(Z,Q)+G.get(Z,Q+1)+G.get(Z+1,Q)+G.get(Z+1,Q+1);(pt===4||pt===0)&&H++}return H*$.N2},Y.getPenaltyN3=function(G){let X=G.size,H=0,Z=0,Q=0;for(let pt=0;pt<X;pt++){Z=Q=0;for(let ft=0;ft<X;ft++)Z=Z<<1&2047|G.get(pt,ft),ft>=10&&(Z===1488||Z===93)&&H++,Q=Q<<1&2047|G.get(ft,pt),ft>=10&&(Q===1488||Q===93)&&H++}return H*$.N3},Y.getPenaltyN4=function(G){let X=0,H=G.data.length;for(let Z=0;Z<H;Z++)X+=G.data[Z];return Math.abs(Math.ceil(X*100/H/5)-10)*$.N4};function q(G,X,H){switch(G){case Y.Patterns.PATTERN000:return(X+H)%2==0;case Y.Patterns.PATTERN001:return X%2==0;case Y.Patterns.PATTERN010:return H%3==0;case Y.Patterns.PATTERN011:return(X+H)%3==0;case Y.Patterns.PATTERN100:return(Math.floor(X/2)+Math.floor(H/3))%2==0;case Y.Patterns.PATTERN101:return X*H%2+X*H%3==0;case Y.Patterns.PATTERN110:return(X*H%2+X*H%3)%2==0;case Y.Patterns.PATTERN111:return(X*H%3+(X+H)%2)%2==0;default:throw Error("bad maskPattern:"+G)}}Y.applyMask=function(G,X){let H=X.size;for(let Z=0;Z<H;Z++)for(let Q=0;Q<H;Q++)X.isReserved(Q,Z)||X.xor(Q,Z,q(G,Q,Z))},Y.getBestMask=function(G,X){let H=Object.keys(Y.Patterns).length,Z=0,Q=1/0;for(let pt=0;pt<H;pt++){X(pt),Y.applyMask(pt,G);let ft=Y.getPenaltyN1(G)+Y.getPenaltyN2(G)+Y.getPenaltyN3(G)+Y.getPenaltyN4(G);Y.applyMask(pt,G),ft<Q&&(Q=ft,Z=pt)}return Z}}),Oe=o(Y=>{var $=Se(),q=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],G=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];Y.getBlocksCount=function(X,H){switch(H){case $.L:return q[(X-1)*4+0];case $.M:return q[(X-1)*4+1];case $.Q:return q[(X-1)*4+2];case $.H:return q[(X-1)*4+3];default:return}},Y.getTotalCodewordsCount=function(X,H){switch(H){case $.L:return G[(X-1)*4+0];case $.M:return G[(X-1)*4+1];case $.Q:return G[(X-1)*4+2];case $.H:return G[(X-1)*4+3];default:return}}}),ke=o(Y=>{var $=new Uint8Array(512),q=new Uint8Array(256);(function(){let G=1;for(let X=0;X<255;X++)$[X]=G,q[G]=X,G<<=1,G&256&&(G^=285);for(let X=255;X<512;X++)$[X]=$[X-255]})(),Y.log=function(G){if(G<1)throw Error("log("+G+")");return q[G]},Y.exp=function(G){return $[G]},Y.mul=function(G,X){return G===0||X===0?0:$[q[G]+q[X]]}}),Ae=o(Y=>{var $=ke();Y.mul=function(q,G){let X=new Uint8Array(q.length+G.length-1);for(let H=0;H<q.length;H++)for(let Z=0;Z<G.length;Z++)X[H+Z]^=$.mul(q[H],G[Z]);return X},Y.mod=function(q,G){let X=new Uint8Array(q);for(;X.length-G.length>=0;){let H=X[0];for(let Q=0;Q<G.length;Q++)X[Q]^=$.mul(G[Q],H);let Z=0;for(;Z<X.length&&X[Z]===0;)Z++;X=X.slice(Z)}return X},Y.generateECPolynomial=function(q){let G=new Uint8Array([1]);for(let X=0;X<q;X++)G=Y.mul(G,new Uint8Array([1,$.exp(X)]));return G}}),je=o((Y,$)=>{var q=Ae();function G(X){this.genPoly=void 0,this.degree=X,this.degree&&this.initialize(this.degree)}G.prototype.initialize=function(X){this.degree=X,this.genPoly=q.generateECPolynomial(this.degree)},G.prototype.encode=function(X){if(!this.genPoly)throw Error("Encoder not initialized");let H=new Uint8Array(X.length+this.degree);H.set(X);let Z=q.mod(H,this.genPoly),Q=this.degree-Z.length;if(Q>0){let pt=new Uint8Array(this.degree);return pt.set(Z,Q),pt}return Z},$.exports=G}),Me=o(Y=>{Y.isValid=function($){return!isNaN($)&&$>=1&&$<=40}}),Ne=o(Y=>{var $="[0-9]+",q="[A-Z $%*+\\-./:]+",G="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";G=G.replace(/u/g,"\\u");var X="(?:(?![A-Z0-9 $%*+\\-./:]|"+G+`)(?:.|[\r
]))+`;Y.KANJI=new RegExp(G,"g"),Y.BYTE_KANJI=RegExp("[^A-Z0-9 $%*+\\-./:]+","g"),Y.BYTE=new RegExp(X,"g"),Y.NUMERIC=new RegExp($,"g"),Y.ALPHANUMERIC=new RegExp(q,"g");var H=RegExp("^"+G+"$"),Z=RegExp("^"+$+"$"),Q=RegExp("^[A-Z0-9 $%*+\\-./:]+$");Y.testKanji=function(pt){return H.test(pt)},Y.testNumeric=function(pt){return Z.test(pt)},Y.testAlphanumeric=function(pt){return Q.test(pt)}}),Pe=o(Y=>{var $=Me(),q=Ne();Y.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},Y.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},Y.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},Y.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},Y.MIXED={bit:-1},Y.getCharCountIndicator=function(X,H){if(!X.ccBits)throw Error("Invalid mode: "+X);if(!$.isValid(H))throw Error("Invalid version: "+H);return H>=1&&H<10?X.ccBits[0]:H<27?X.ccBits[1]:X.ccBits[2]},Y.getBestModeForData=function(X){return q.testNumeric(X)?Y.NUMERIC:q.testAlphanumeric(X)?Y.ALPHANUMERIC:q.testKanji(X)?Y.KANJI:Y.BYTE},Y.toString=function(X){if(X&&X.id)return X.id;throw Error("Invalid mode")},Y.isValid=function(X){return X&&X.bit&&X.ccBits};function G(X){if(typeof X!="string")throw Error("Param is not a string");switch(X.toLowerCase()){case"numeric":return Y.NUMERIC;case"alphanumeric":return Y.ALPHANUMERIC;case"kanji":return Y.KANJI;case"byte":return Y.BYTE;default:throw Error("Unknown mode: "+X)}}Y.from=function(X,H){if(Y.isValid(X))return X;try{return G(X)}catch{return H}}}),Fe=o(Y=>{var $=xe(),q=Oe(),G=Se(),X=Pe(),H=Me(),Z=7973,Q=$.getBCHDigit(Z);function pt(mt,At,It){for(let Xt=1;Xt<=40;Xt++)if(At<=Y.getCapacity(Xt,It,mt))return Xt}function ft(mt,At){return X.getCharCountIndicator(mt,At)+4}function ht(mt,At){let It=0;return mt.forEach(function(Xt){let qt=ft(Xt.mode,At);It+=qt+Xt.getBitsLength()}),It}function kt(mt,At){for(let It=1;It<=40;It++)if(ht(mt,It)<=Y.getCapacity(It,At,X.MIXED))return It}Y.from=function(mt,At){return H.isValid(mt)?parseInt(mt,10):At},Y.getCapacity=function(mt,At,It){if(!H.isValid(mt))throw Error("Invalid QR Code version");It===void 0&&(It=X.BYTE);let Xt=($.getSymbolTotalCodewords(mt)-q.getTotalCodewordsCount(mt,At))*8;if(It===X.MIXED)return Xt;let qt=Xt-ft(It,mt);switch(It){case X.NUMERIC:return Math.floor(qt/10*3);case X.ALPHANUMERIC:return Math.floor(qt/11*2);case X.KANJI:return Math.floor(qt/13);case X.BYTE:default:return Math.floor(qt/8)}},Y.getBestVersionForData=function(mt,At){let It,Xt=G.from(At,G.M);if(Array.isArray(mt)){if(mt.length>1)return kt(mt,Xt);if(mt.length===0)return 1;It=mt[0]}else It=mt;return pt(It.mode,It.getLength(),Xt)},Y.getEncodedBits=function(mt){if(!H.isValid(mt)||mt<7)throw Error("Invalid QR Code version");let At=mt<<12;for(;$.getBCHDigit(At)-Q>=0;)At^=Z<<$.getBCHDigit(At)-Q;return mt<<12|At}}),Ie=o(Y=>{var $=xe(),q=1335,G=21522,X=$.getBCHDigit(q);Y.getEncodedBits=function(H,Z){let Q=H.bit<<3|Z,pt=Q<<10;for(;$.getBCHDigit(pt)-X>=0;)pt^=q<<$.getBCHDigit(pt)-X;return(Q<<10|pt)^G}}),Le=o((Y,$)=>{var q=Pe();function G(X){this.mode=q.NUMERIC,this.data=X.toString()}G.getBitsLength=function(X){return 10*Math.floor(X/3)+(X%3?X%3*3+1:0)},G.prototype.getLength=function(){return this.data.length},G.prototype.getBitsLength=function(){return G.getBitsLength(this.data.length)},G.prototype.write=function(X){let H,Z,Q;for(H=0;H+3<=this.data.length;H+=3)Z=this.data.substr(H,3),Q=parseInt(Z,10),X.put(Q,10);let pt=this.data.length-H;pt>0&&(Z=this.data.substr(H),Q=parseInt(Z,10),X.put(Q,pt*3+1))},$.exports=G}),Re=o((Y,$)=>{var q=Pe(),G="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:".split("");function X(H){this.mode=q.ALPHANUMERIC,this.data=H}X.getBitsLength=function(H){return 11*Math.floor(H/2)+H%2*6},X.prototype.getLength=function(){return this.data.length},X.prototype.getBitsLength=function(){return X.getBitsLength(this.data.length)},X.prototype.write=function(H){let Z;for(Z=0;Z+2<=this.data.length;Z+=2){let Q=G.indexOf(this.data[Z])*45;Q+=G.indexOf(this.data[Z+1]),H.put(Q,11)}this.data.length%2&&H.put(G.indexOf(this.data[Z]),6)},$.exports=X}),ze=o((Y,$)=>{var q=Pe();function G(X){this.mode=q.BYTE,typeof X=="string"?this.data=new TextEncoder().encode(X):this.data=new Uint8Array(X)}G.getBitsLength=function(X){return X*8},G.prototype.getLength=function(){return this.data.length},G.prototype.getBitsLength=function(){return G.getBitsLength(this.data.length)},G.prototype.write=function(X){for(let H=0,Z=this.data.length;H<Z;H++)X.put(this.data[H],8)},$.exports=G}),Be=o((Y,$)=>{var q=Pe(),G=xe();function X(H){this.mode=q.KANJI,this.data=H}X.getBitsLength=function(H){return H*13},X.prototype.getLength=function(){return this.data.length},X.prototype.getBitsLength=function(){return X.getBitsLength(this.data.length)},X.prototype.write=function(H){let Z;for(Z=0;Z<this.data.length;Z++){let Q=G.toSJIS(this.data[Z]);if(Q>=33088&&Q<=40956)Q-=33088;else if(Q>=57408&&Q<=60351)Q-=49472;else throw Error("Invalid SJIS character: "+this.data[Z]+`
Make sure your charset is UTF-8`);Q=(Q>>>8&255)*192+(Q&255),H.put(Q,13)}},$.exports=X}),Ve=o((Y,$)=>{var q={single_source_shortest_paths:function(G,X,H){var Z={},Q={};Q[X]=0;var pt=q.PriorityQueue.make();pt.push(X,0);for(var ft,ht,kt,mt,At,It,Xt,qt,Yt;!pt.empty();)for(kt in ft=pt.pop(),ht=ft.value,mt=ft.cost,At=G[ht]||{},At)At.hasOwnProperty(kt)&&(It=At[kt],Xt=mt+It,qt=Q[kt],Yt=Q[kt]===void 0,(Yt||qt>Xt)&&(Q[kt]=Xt,pt.push(kt,Xt),Z[kt]=ht));if(H!==void 0&&Q[H]===void 0){var xt=["Could not find a path from ",X," to ",H,"."].join("");throw Error(xt)}return Z},extract_shortest_path_from_predecessor_list:function(G,X){for(var H=[],Z=X;Z;)H.push(Z),G[Z],Z=G[Z];return H.reverse(),H},find_path:function(G,X,H){var Z=q.single_source_shortest_paths(G,X,H);return q.extract_shortest_path_from_predecessor_list(Z,H)},PriorityQueue:{make:function(G){var X=q.PriorityQueue,H={},Z;for(Z in G||(G={}),X)X.hasOwnProperty(Z)&&(H[Z]=X[Z]);return H.queue=[],H.sorter=G.sorter||X.default_sorter,H},default_sorter:function(G,X){return G.cost-X.cost},push:function(G,X){var H={value:G,cost:X};this.queue.push(H),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return this.queue.length===0}}};$!==void 0&&($.exports=q)}),He=o(Y=>{var $=Pe(),q=Le(),G=Re(),X=ze(),H=Be(),Z=Ne(),Q=xe(),pt=Ve();function ft(Yt){return unescape(encodeURIComponent(Yt)).length}function ht(Yt,xt,Rt){let Nt=[],Kt;for(;(Kt=Yt.exec(Rt))!==null;)Nt.push({data:Kt[0],index:Kt.index,mode:xt,length:Kt[0].length});return Nt}function kt(Yt){let xt=ht(Z.NUMERIC,$.NUMERIC,Yt),Rt=ht(Z.ALPHANUMERIC,$.ALPHANUMERIC,Yt),Nt,Kt;return Q.isKanjiModeEnabled()?(Nt=ht(Z.BYTE,$.BYTE,Yt),Kt=ht(Z.KANJI,$.KANJI,Yt)):(Nt=ht(Z.BYTE_KANJI,$.BYTE,Yt),Kt=[]),xt.concat(Rt,Nt,Kt).sort(function($t,Bt){return $t.index-Bt.index}).map(function($t){return{data:$t.data,mode:$t.mode,length:$t.length}})}function mt(Yt,xt){switch(xt){case $.NUMERIC:return q.getBitsLength(Yt);case $.ALPHANUMERIC:return G.getBitsLength(Yt);case $.KANJI:return H.getBitsLength(Yt);case $.BYTE:return X.getBitsLength(Yt)}}function At(Yt){return Yt.reduce(function(xt,Rt){let Nt=xt.length-1>=0?xt[xt.length-1]:null;return Nt&&Nt.mode===Rt.mode?(xt[xt.length-1].data+=Rt.data,xt):(xt.push(Rt),xt)},[])}function It(Yt){let xt=[];for(let Rt=0;Rt<Yt.length;Rt++){let Nt=Yt[Rt];switch(Nt.mode){case $.NUMERIC:xt.push([Nt,{data:Nt.data,mode:$.ALPHANUMERIC,length:Nt.length},{data:Nt.data,mode:$.BYTE,length:Nt.length}]);break;case $.ALPHANUMERIC:xt.push([Nt,{data:Nt.data,mode:$.BYTE,length:Nt.length}]);break;case $.KANJI:xt.push([Nt,{data:Nt.data,mode:$.BYTE,length:ft(Nt.data)}]);break;case $.BYTE:xt.push([{data:Nt.data,mode:$.BYTE,length:ft(Nt.data)}])}}return xt}function Xt(Yt,xt){let Rt={},Nt={start:{}},Kt=["start"];for(let $t=0;$t<Yt.length;$t++){let Bt=Yt[$t],_t=[];for(let Gt=0;Gt<Bt.length;Gt++){let Ft=Bt[Gt],Ut=""+$t+Gt;_t.push(Ut),Rt[Ut]={node:Ft,lastCount:0},Nt[Ut]={};for(let Vt=0;Vt<Kt.length;Vt++){let Ot=Kt[Vt];Rt[Ot]&&Rt[Ot].node.mode===Ft.mode?(Nt[Ot][Ut]=mt(Rt[Ot].lastCount+Ft.length,Ft.mode)-mt(Rt[Ot].lastCount,Ft.mode),Rt[Ot].lastCount+=Ft.length):(Rt[Ot]&&(Rt[Ot].lastCount=Ft.length),Nt[Ot][Ut]=mt(Ft.length,Ft.mode)+4+$.getCharCountIndicator(Ft.mode,xt))}}Kt=_t}for(let $t=0;$t<Kt.length;$t++)Nt[Kt[$t]].end=0;return{map:Nt,table:Rt}}function qt(Yt,xt){let Rt,Nt=$.getBestModeForData(Yt);if(Rt=$.from(xt,Nt),Rt!==$.BYTE&&Rt.bit<Nt.bit)throw Error('"'+Yt+'" cannot be encoded with mode '+$.toString(Rt)+`.
 Suggested mode is: `+$.toString(Nt));switch(Rt===$.KANJI&&!Q.isKanjiModeEnabled()&&(Rt=$.BYTE),Rt){case $.NUMERIC:return new q(Yt);case $.ALPHANUMERIC:return new G(Yt);case $.KANJI:return new H(Yt);case $.BYTE:return new X(Yt)}}Y.fromArray=function(Yt){return Yt.reduce(function(xt,Rt){return typeof Rt=="string"?xt.push(qt(Rt,null)):Rt.data&&xt.push(qt(Rt.data,Rt.mode)),xt},[])},Y.fromString=function(Yt,xt){let Rt=Xt(It(kt(Yt,Q.isKanjiModeEnabled())),xt),Nt=pt.find_path(Rt.map,"start","end"),Kt=[];for(let $t=1;$t<Nt.length-1;$t++)Kt.push(Rt.table[Nt[$t]].node);return Y.fromArray(At(Kt))},Y.rawSplit=function(Yt){return Y.fromArray(kt(Yt,Q.isKanjiModeEnabled()))}}),Ue=o(Y=>{var $=xe(),q=Se(),G=Ce(),X=we(),H=Te(),Z=Ee(),Q=De(),pt=Oe(),ft=je(),ht=Fe(),kt=Ie(),mt=Pe(),At=He();function It(Bt,_t){let Gt=Bt.size,Ft=Z.getPositions(_t);for(let Ut=0;Ut<Ft.length;Ut++){let Vt=Ft[Ut][0],Ot=Ft[Ut][1];for(let Pt=-1;Pt<=7;Pt++)if(!(Vt+Pt<=-1||Gt<=Vt+Pt))for(let Qt=-1;Qt<=7;Qt++)Ot+Qt<=-1||Gt<=Ot+Qt||(Pt>=0&&Pt<=6&&(Qt===0||Qt===6)||Qt>=0&&Qt<=6&&(Pt===0||Pt===6)||Pt>=2&&Pt<=4&&Qt>=2&&Qt<=4?Bt.set(Vt+Pt,Ot+Qt,!0,!0):Bt.set(Vt+Pt,Ot+Qt,!1,!0))}}function Xt(Bt){let _t=Bt.size;for(let Gt=8;Gt<_t-8;Gt++){let Ft=Gt%2==0;Bt.set(Gt,6,Ft,!0),Bt.set(6,Gt,Ft,!0)}}function qt(Bt,_t){let Gt=H.getPositions(_t);for(let Ft=0;Ft<Gt.length;Ft++){let Ut=Gt[Ft][0],Vt=Gt[Ft][1];for(let Ot=-2;Ot<=2;Ot++)for(let Pt=-2;Pt<=2;Pt++)Ot===-2||Ot===2||Pt===-2||Pt===2||Ot===0&&Pt===0?Bt.set(Ut+Ot,Vt+Pt,!0,!0):Bt.set(Ut+Ot,Vt+Pt,!1,!0)}}function Yt(Bt,_t){let Gt=Bt.size,Ft=ht.getEncodedBits(_t),Ut,Vt,Ot;for(let Pt=0;Pt<18;Pt++)Ut=Math.floor(Pt/3),Vt=Pt%3+Gt-8-3,Ot=(Ft>>Pt&1)==1,Bt.set(Ut,Vt,Ot,!0),Bt.set(Vt,Ut,Ot,!0)}function xt(Bt,_t,Gt){let Ft=Bt.size,Ut=kt.getEncodedBits(_t,Gt),Vt,Ot;for(Vt=0;Vt<15;Vt++)Ot=(Ut>>Vt&1)==1,Vt<6?Bt.set(Vt,8,Ot,!0):Vt<8?Bt.set(Vt+1,8,Ot,!0):Bt.set(Ft-15+Vt,8,Ot,!0),Vt<8?Bt.set(8,Ft-Vt-1,Ot,!0):Vt<9?Bt.set(8,15-Vt-1+1,Ot,!0):Bt.set(8,15-Vt-1,Ot,!0);Bt.set(Ft-8,8,1,!0)}function Rt(Bt,_t){let Gt=Bt.size,Ft=-1,Ut=Gt-1,Vt=7,Ot=0;for(let Pt=Gt-1;Pt>0;Pt-=2)for(Pt===6&&Pt--;;){for(let Qt=0;Qt<2;Qt++)if(!Bt.isReserved(Ut,Pt-Qt)){let Dt=!1;Ot<_t.length&&(Dt=(_t[Ot]>>>Vt&1)==1),Bt.set(Ut,Pt-Qt,Dt),Vt--,Vt===-1&&(Ot++,Vt=7)}if(Ut+=Ft,Ut<0||Gt<=Ut){Ut-=Ft,Ft=-Ft;break}}}function Nt(Bt,_t,Gt){let Ft=new G;Gt.forEach(function(Ot){Ft.put(Ot.mode.bit,4),Ft.put(Ot.getLength(),mt.getCharCountIndicator(Ot.mode,Bt)),Ot.write(Ft)});let Ut=($.getSymbolTotalCodewords(Bt)-pt.getTotalCodewordsCount(Bt,_t))*8;for(Ft.getLengthInBits()+4<=Ut&&Ft.put(0,4);Ft.getLengthInBits()%8!=0;)Ft.putBit(0);let Vt=(Ut-Ft.getLengthInBits())/8;for(let Ot=0;Ot<Vt;Ot++)Ft.put(Ot%2?17:236,8);return Kt(Ft,Bt,_t)}function Kt(Bt,_t,Gt){let Ft=$.getSymbolTotalCodewords(_t),Ut=Ft-pt.getTotalCodewordsCount(_t,Gt),Vt=pt.getBlocksCount(_t,Gt),Ot=Vt-Ft%Vt,Pt=Math.floor(Ft/Vt),Qt=Math.floor(Ut/Vt),Dt=Qt+1,Tt=Pt-Qt,Lt=new ft(Tt),nn=0,tn=Array(Vt),sn=Array(Vt),K=0,St=new Uint8Array(Bt.buffer);for(let ln=0;ln<Vt;ln++){let vn=ln<Ot?Qt:Dt;tn[ln]=St.slice(nn,nn+vn),sn[ln]=Lt.encode(tn[ln]),nn+=vn,K=Math.max(K,vn)}let Mt=new Uint8Array(Ft),Ht=0,Jt,Wt;for(Jt=0;Jt<K;Jt++)for(Wt=0;Wt<Vt;Wt++)Jt<tn[Wt].length&&(Mt[Ht++]=tn[Wt][Jt]);for(Jt=0;Jt<Tt;Jt++)for(Wt=0;Wt<Vt;Wt++)Mt[Ht++]=sn[Wt][Jt];return Mt}function $t(Bt,_t,Gt,Ft){let Ut;if(Array.isArray(Bt))Ut=At.fromArray(Bt);else if(typeof Bt=="string"){let Qt=_t;if(!Qt){let Dt=At.rawSplit(Bt);Qt=ht.getBestVersionForData(Dt,Gt)}Ut=At.fromString(Bt,Qt||40)}else throw Error("Invalid data");let Vt=ht.getBestVersionForData(Ut,Gt);if(!Vt)throw Error("The amount of data is too big to be stored in a QR Code");if(!_t)_t=Vt;else if(_t<Vt)throw Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: `+Vt+`.
`);let Ot=Nt(_t,Gt,Ut),Pt=new X($.getSymbolSize(_t));return It(Pt,_t),Xt(Pt),qt(Pt,_t),xt(Pt,Gt,0),_t>=7&&Yt(Pt,_t),Rt(Pt,Ot),isNaN(Ft)&&(Ft=Q.getBestMask(Pt,xt.bind(null,Pt,Gt))),Q.applyMask(Ft,Pt),xt(Pt,Gt,Ft),{modules:Pt,version:_t,errorCorrectionLevel:Gt,maskPattern:Ft,segments:Ut}}Y.create=function(Bt,_t){if(Bt===void 0||Bt==="")throw Error("No input text");let Gt=q.M,Ft,Ut;return _t!==void 0&&(Gt=q.from(_t.errorCorrectionLevel,q.M),Ft=ht.from(_t.version),Ut=Q.from(_t.maskPattern),_t.toSJISFunc&&$.setToSJISFunction(_t.toSJISFunc)),$t(Bt,Ft,Gt,Ut)}}),We=o(Y=>{function $(q){if(typeof q=="number"&&(q=q.toString()),typeof q!="string")throw Error("Color should be defined as hex string");let G=q.slice().replace("#","").split("");if(G.length<3||G.length===5||G.length>8)throw Error("Invalid hex color: "+q);(G.length===3||G.length===4)&&(G=Array.prototype.concat.apply([],G.map(function(H){return[H,H]}))),G.length===6&&G.push("F","F");let X=parseInt(G.join(""),16);return{r:X>>24&255,g:X>>16&255,b:X>>8&255,a:X&255,hex:"#"+G.slice(0,6).join("")}}Y.getOptions=function(q){q||(q={}),q.color||(q.color={});let G=q.margin===void 0||q.margin===null||q.margin<0?4:q.margin,X=q.width&&q.width>=21?q.width:void 0,H=q.scale||4;return{width:X,scale:X?4:H,margin:G,color:{dark:$(q.color.dark||"#000000ff"),light:$(q.color.light||"#ffffffff")},type:q.type,rendererOpts:q.rendererOpts||{}}},Y.getScale=function(q,G){return G.width&&G.width>=q+G.margin*2?G.width/(q+G.margin*2):G.scale},Y.getImageWidth=function(q,G){let X=Y.getScale(q,G);return Math.floor((q+G.margin*2)*X)},Y.qrToImageData=function(q,G,X){let H=G.modules.size,Z=G.modules.data,Q=Y.getScale(H,X),pt=Math.floor((H+X.margin*2)*Q),ft=X.margin*Q,ht=[X.color.light,X.color.dark];for(let kt=0;kt<pt;kt++)for(let mt=0;mt<pt;mt++){let At=(kt*pt+mt)*4,It=X.color.light;if(kt>=ft&&mt>=ft&&kt<pt-ft&&mt<pt-ft){let Xt=Math.floor((kt-ft)/Q),qt=Math.floor((mt-ft)/Q);It=ht[Z[Xt*H+qt]?1:0]}q[At++]=It.r,q[At++]=It.g,q[At++]=It.b,q[At]=It.a}}}),Ge=o(Y=>{var $=We();function q(X,H,Z){X.clearRect(0,0,H.width,H.height),H.style||(H.style={}),H.height=Z,H.width=Z,H.style.height=Z+"px",H.style.width=Z+"px"}function G(){try{return document.createElement("canvas")}catch{throw Error("You need to specify a canvas element")}}Y.render=function(X,H,Z){let Q=Z,pt=H;Q===void 0&&(!H||!H.getContext)&&(Q=H,H=void 0),H||(pt=G()),Q=$.getOptions(Q);let ft=$.getImageWidth(X.modules.size,Q),ht=pt.getContext("2d"),kt=ht.createImageData(ft,ft);return $.qrToImageData(kt.data,X,Q),q(ht,pt,ft),ht.putImageData(kt,0,0),pt},Y.renderToDataURL=function(X,H,Z){let Q=Z;Q===void 0&&(!H||!H.getContext)&&(Q=H,H=void 0),Q||(Q={});let pt=Y.render(X,H,Q),ft=Q.type||"image/png",ht=Q.rendererOpts||{};return pt.toDataURL(ft,ht.quality)}}),Ke=o(Y=>{var $=We();function q(H,Z){let Q=H.a/255,pt=Z+'="'+H.hex+'"';return Q<1?pt+" "+Z+'-opacity="'+Q.toFixed(2).slice(1)+'"':pt}function G(H,Z,Q){let pt=H+Z;return Q!==void 0&&(pt+=" "+Q),pt}function X(H,Z,Q){let pt="",ft=0,ht=!1,kt=0;for(let mt=0;mt<H.length;mt++){let At=Math.floor(mt%Z),It=Math.floor(mt/Z);!At&&!ht&&(ht=!0),H[mt]?(kt++,mt>0&&At>0&&H[mt-1]||(pt+=ht?G("M",At+Q,.5+It+Q):G("m",ft,0),ft=0,ht=!1),At+1<Z&&H[mt+1]||(pt+=G("h",kt),kt=0)):ft++}return pt}Y.render=function(H,Z,Q){let pt=$.getOptions(Z),ft=H.modules.size,ht=H.modules.data,kt=ft+pt.margin*2,mt=pt.color.light.a?"<path "+q(pt.color.light,"fill")+' d="M0 0h'+kt+"v"+kt+'H0z"/>':"",At="<path "+q(pt.color.dark,"stroke")+' d="'+X(ht,ft,pt.margin)+'"/>',It='viewBox="0 0 '+kt+" "+kt+'"',Xt='<svg xmlns="http://www.w3.org/2000/svg" '+(pt.width?'width="'+pt.width+'" height="'+pt.width+'" ':"")+It+' shape-rendering="crispEdges">'+mt+At+`</svg>
`;return typeof Q=="function"&&Q(null,Xt),Xt}}),qe=c(o(Y=>{var $=be(),q=Ue(),G=Ge(),X=Ke();function H(Z,Q,pt,ft,ht){let kt=[].slice.call(arguments,1),mt=kt.length,At=typeof kt[mt-1]=="function";if(!At&&!$())throw Error("Callback required as last argument");if(At){if(mt<2)throw Error("Too few arguments provided");mt===2?(ht=pt,pt=Q,Q=ft=void 0):mt===3&&(Q.getContext&&ht===void 0?(ht=ft,ft=void 0):(ht=ft,ft=pt,pt=Q,Q=void 0))}else{if(mt<1)throw Error("Too few arguments provided");return mt===1?(pt=Q,Q=ft=void 0):mt===2&&!Q.getContext&&(ft=pt,pt=Q,Q=void 0),new Promise(function(It,Xt){try{It(Z(q.create(pt,ft),Q,ft))}catch(qt){Xt(qt)}})}try{let It=q.create(pt,ft);ht(null,Z(It,Q,ft))}catch(It){ht(It)}}Y.create=q.create,Y.toCanvas=H.bind(null,G.render),Y.toDataURL=H.bind(null,G.renderToDataURL),Y.toString=H.bind(null,function(Z,Q,pt){return X.render(Z,pt)})})(),1);function Je(Y){try{let{modules:$}=qe.create(Y||"https://www.gestionvelora.com/",{errorCorrectionLevel:"M"}),{size:q}=$,G=[];for(let X=0;X<q;X++){let H=[];for(let Z=0;Z<q;Z++)H.push($.get(Z,X)===1);G.push(H)}return G}catch{return Je(b)}}var Ye={Dirt:0,CherryBlossom:1,Trunk:2,Grass:3,FallenPetals:4,Branch:5};function Xe(Y,$,q=0){let G=Math.sin(Y*127.1+$*311.7+q*43.7)*43758.5;return G-Math.floor(G)}function Ze(Y){let $=Y.length,q=$/2,G=$/2,X=[],H=[],Z=[],Q=[],pt=12*C,ft=$*ee,ht=0;for(let mt=0;mt<$;mt++)for(let At=0;At<$;At++){let It=Y[mt][At],Xt=At-q,qt=mt-G,Yt=Math.sqrt(Xt*Xt+qt*qt);X.push(At,mt,0,0),H.push(C),Z.push(0),It?Yt<2.5?Q.push(Ye.Trunk):Yt>=ft?Q.push(Ye.Grass):Q.push(Ye.FallenPetals):Q.push(Ye.Dirt),ht++}for(let mt=0;mt<$;mt++)for(let At=0;At<$;At++){if(!Y[mt][At])continue;let It=At-q,Xt=mt-G;if(Math.sqrt(It*It+Xt*Xt)<2.5)for(let qt=1;qt<12;qt++)X.push(At,mt,0,0),H.push(C),Z.push(qt*C),Q.push(Ye.Trunk),ht++}for(let mt=0;mt<$;mt++)for(let At=0;At<$;At++){if(!Y[mt][At])continue;let It=At-q,Xt=mt-G,qt=Math.sqrt(It*It+Xt*Xt);if(qt<ft){let Yt=1-qt/ft,xt=Math.max(3,Math.round(12*(.25+.75*Yt*Yt)));for(let Nt=0;Nt<xt;Nt++){let Kt=pt+Nt*C,$t=Math.floor(Yt*3)*C;X.push(At,mt,0,0),H.push(C),Z.push(Kt+$t),Q.push(Ye.CherryBlossom),ht++}let Rt=Math.floor(Xe(At,mt,500)*4);for(let Nt=0;Nt<Rt;Nt++){let Kt=xt+Nt,$t=Math.floor(Yt*3)*C;X.push(At,mt,0,0),H.push(C),Z.push(pt+Kt*C+$t),Q.push(Ye.CherryBlossom),ht++}}}let kt=w*.6;for(let mt=0;mt<$;mt++)for(let At=0;At<$;At++){let It=At-q,Xt=mt-G;if(!(Math.sqrt(It*It+Xt*Xt)>=kt))for(let qt=0;qt<4;qt++)X.push(At,mt,0,0),H.push(C),Z.push(pt+qt*C),Q.push(Ye.Trunk),ht++}return{positions:X,heights:H,baseY:Z,types:Q,gridSize:$,numBlocks:ht}}function Qe(Y){let $=Y.length,q=$/2,G=$/2,X=12*C,H=$*ee,Z=[],Q=0;for(let pt=0;pt<$;pt++)for(let ft=0;ft<$;ft++){let ht=ft-q,kt=pt-G,mt=Math.sqrt(ht*ht+kt*kt);if(mt<H&&mt>=2.5){let At=1-mt/H,It=Math.max(3,Math.round(12*(.25+.75*At*At)))+Math.floor(Xe(ft,pt,500)*4),Xt=Math.floor(At*3)*C,qt=X+(It-1)*C+Xt+C,Yt=4+Math.floor(Xe(ft,pt,600)*3);for(let xt=0;xt<Yt;xt++){let Rt=Xe(ft,pt,777+xt),Nt=(Xe(ft,pt,800+xt)-.5)*1.2,Kt=(Xe(ft,pt,900+xt)-.5)*1.2,$t=(Xe(ft,pt,1e3+xt)-.6)*C*2;Z.push(ft+Nt,pt+Kt,qt+$t,Rt),Q++}if(Xe(ft,pt,1100)<.35){let xt=Xe(ft,pt,1200)+1,Rt=(Xe(ft,pt,1300)-.5)*.5,Nt=(Xe(ft,pt,1400)-.5)*.5;Z.push(ft+Rt,pt+Nt,qt-C*1,xt),Q++}}}return{positions:Z,count:Q}}function M(Y,$=0,q=0){let G=Math.sin(Y*127.1+$*311.7+q*43.7)*43758.5;return G-Math.floor(G)}function $e(Y){let $=Y.length,q=0,G=0;for(let pt=0;pt<$;pt++)for(let ft=0;ft<$;ft++)Y[pt][ft]&&q++,ft>0&&Y[pt][ft]!==Y[pt][ft-1]&&G++,pt>0&&Y[pt][ft]!==Y[pt-1][ft]&&G++;let X=$*$,H=2*$*($-1),Z=q/X,Q=G/H;return{gridSize:$,density:Z,edgeRatio:Q,trunkHeight:.26+Z*.08,trunkRadius:.024+Z*.008,trunkLean:.04+M(Z,Q)*.03,mainBranches:4+Math.floor(Z*4),branchSpread:.5+Q*.5,branchLengthScale:.55+Z*.25,maxDepth:Q>.28?5:4,canopyDensity:.5+Z*.5}}function et(Y,$){let q=$*ee*S,G=[],X=[],{trunkHeight:H,trunkRadius:Z,trunkLean:Q,mainBranches:pt,branchLengthScale:ft,maxDepth:ht}=Y,kt=0;function mt(xt,Rt,Nt,Kt,$t,Bt,_t,Gt,Ft,Ut){G.push(xt,Rt,Nt,Kt,$t,Bt,_t,Gt,Ft,Ut,0,0),kt++}for(let xt=0;xt<10;xt++){let Rt=xt/10,Nt=(xt+1)/10,Kt=1+Math.sin(Rt*Math.PI*.8)*.08,$t=1+Math.sin(Nt*Math.PI*.8)*.08,Bt=Z*(1-Rt*.55)*Kt,_t=Z*(1-Nt*.55)*$t,Gt=Q*Rt*Rt+Q*.3*Math.sin(Rt*Math.PI*1.5),Ft=Q*.5*Math.sin(Rt*Math.PI*.8),Ut=Q*Nt*Nt+Q*.3*Math.sin(Nt*Math.PI*1.5),Vt=Q*.5*Math.sin(Nt*Math.PI*.8);mt(Gt,Rt*H,Ft,Bt,Ut,Nt*H,Vt,_t,0,Rt*.5)}function At(xt){return{x:Q*xt*xt+Q*.3*Math.sin(xt*Math.PI*1.5),y:H*xt,z:Q*.5*Math.sin(xt*Math.PI*.8)}}let It=H+q*.9;function Xt(xt,Rt,Nt,Kt,$t,Bt,_t,Gt,Ft,Ut){if(kt>=485)return;mt(xt,Rt,Nt,Kt,$t,Bt,_t,Gt,Ut,M(kt,0,400));let Vt=1+Math.floor(M(kt,0,500)*2);for(let Ot=0;Ot<Vt&&!(kt>=485);Ot++){let Pt=Ft+(M(kt,Ot,600)-.5)*2,Qt=q*(.15+M(kt,Ot,700)*.2)*ft,Dt=.15+M(kt,Ot,750)*.6,Tt=Gt*(.5+M(kt,Ot,800)*.2),Lt=$t+Math.cos(Pt)*Math.cos(Dt)*Qt,nn=Bt+Math.sin(Dt)*Qt,tn=_t+Math.sin(Pt)*Math.cos(Dt)*Qt,sn=Tt*.4,K=Math.sqrt(Lt*Lt+tn*tn);if(K>q*.95&&(Lt*=q*.95/K,tn*=q*.95/K),mt($t,Bt,_t,Tt,Lt,nn,tn,sn,Ut+1,M(kt,Ot,850)),X.push({x:Lt,y:nn,z:tn,radius:sn*25}),ht>=4&&kt<485){let St=Pt+(M(kt,Ot,860)-.5)*2,Mt=Qt*.45,Ht=.3+M(kt,Ot,870)*.5,Jt=sn*.5,Wt=Lt+Math.cos(St)*Math.cos(Ht)*Mt,ln=nn+Math.sin(Ht)*Mt,vn=tn+Math.sin(St)*Math.cos(Ht)*Mt,yn=Math.sqrt(Wt*Wt+vn*vn);yn>q*.95&&(Wt*=q*.95/yn,vn*=q*.95/yn),mt(Lt,nn,tn,sn,Wt,ln,vn,Jt*.3,Ut+2,M(kt,Ot,880)),X.push({x:Wt,y:ln,z:vn,radius:Jt*15})}}}let qt=3+Math.floor(M(0,0,2e3)*2),Yt=At(.95);for(let xt=0;xt<qt&&!(kt>=470);xt++){let Rt=xt/qt*Math.PI*2+M(xt,0,2100)*.5,Nt=q*(.1+M(xt,0,2200)*.25),Kt=Z*(.3+M(xt,0,2300)*.12),$t=2+Math.floor(M(xt,0,2400)),Bt=Yt.x,_t=Yt.y,Gt=Yt.z,Ft=Kt;for(let Ut=0;Ut<$t&&!(kt>=475);Ut++){let Vt=(Ut+1)/$t,Ot=(M(xt,Ut,2500)-.5)*.01,Pt=(M(xt,Ut,2600)-.5)*.01,Qt=Yt.x+Math.cos(Rt)*Nt*Vt+Ot,Dt=Yt.y+(It-Yt.y)*Vt*(.7+M(xt,Ut,2700)*.3),Tt=Yt.z+Math.sin(Rt)*Nt*Vt+Pt,Lt=Ft*(.5+M(xt,Ut,2800)*.1);mt(Bt,_t,Gt,Ft,Qt,Dt,Tt,Lt,1,M(xt,Ut,2900)),Bt=Qt,_t=Dt,Gt=Tt,Ft=Lt}X.push({x:Bt,y:_t,z:Gt,radius:Ft*35}),Xt(Bt,_t,Gt,Ft*.7,Bt+(M(xt,0,3e3)-.5)*q*.3,_t+q*.1,Gt+(M(xt,0,3100)-.5)*q*.3,Ft*.3,Rt,2)}for(let xt=0;xt<pt&&!(kt>=470);xt++){let Rt=At(.7+M(xt,0,1200)*.25),Nt=xt/pt*Math.PI*2+(M(xt,0,900)-.5)*.4,Kt=q*(.6+M(xt,0,1e3)*.35),$t=H*(.85+M(xt,0,1050)*.35),Bt=Math.cos(Nt)*Kt,_t=Math.sin(Nt)*Kt,Gt=Rt.x,Ft=Rt.y,Ut=Rt.z,Vt=Z*(.4+M(xt,0,1100)*.15);for(let Ot=0;Ot<3&&!(kt>=475);Ot++){let Pt=(Ot+1)/3,Qt=Math.sin(Pt*Math.PI)*q*.3,Dt=(M(xt,Ot,150)-.5)*.015,Tt=(M(xt,Ot,250)-.5)*.015,Lt=Rt.x+(Bt-Rt.x)*Pt+Dt,nn=Rt.y+($t-Rt.y)*Pt+Qt*(1-Pt),tn=Rt.z+(_t-Rt.z)*Pt+Tt,sn=Vt*(.55+M(xt,Ot,350)*.1);mt(Gt,Ft,Ut,Vt,Lt,nn,tn,sn,1,M(xt,Ot,400)),Ot>=1&&kt<470&&Xt(Lt,nn,tn,sn*.6,Lt+(M(xt,Ot,610)-.5)*q*.4,nn+q*(.1+M(xt,Ot,620)*.15),tn+(M(xt,Ot,630)-.5)*q*.4,sn*.25,Nt,2),Gt=Lt,Ft=nn,Ut=tn,Vt=sn}X.push({x:Gt,y:Ft,z:Ut,radius:Vt*30})}return{segments:new Float32Array(G),segmentCount:kt,tips:X}}function tt(Y,$){let q=$.gridSize,G=q*S*.5,X=[],H=0;function Z(ft,ht){return{col:(ft+G)/S,row:(ht+G)/S}}for(let ft=0;ft<Y.length;ft++){let ht=Y[ft];if(M(ft,0,780)<.04)continue;let kt=.8+M(ft,3,790)*.6,mt=Math.max(12,Math.floor(ht.radius*14*$.canopyDensity*kt)),At=ht.radius*S*3.8*kt;for(let Xt=0;Xt<mt;Xt++){let qt=M(ft,Xt,800),Yt=M(ft,Xt,810)*Math.PI*2,xt=M(ft,Xt,820)*2-1,Rt=Math.sqrt(1-xt*xt),Nt=At*Math.cbrt(M(ft,Xt,830)),Kt=ht.x+Nt*Rt*Math.cos(Yt)*1.3,$t=ht.y+Nt*xt*.7+At*.15,Bt=Z(Kt,ht.z+Nt*Rt*Math.sin(Yt)*1.3);X.push(Bt.col,Bt.row,$t,qt),H++}let It=2+Math.floor(M(ft,0,1500)*3);for(let Xt=0;Xt<It;Xt++){let qt=M(ft,Xt,1600),Yt=M(ft,Xt,1700)*Math.PI*2,xt=At*.5,Rt=ht.x+Math.cos(Yt)*xt,Nt=ht.z+Math.sin(Yt)*xt,Kt=ht.y-C*(.5+M(ft,Xt,1900)*2),$t=Z(Rt,Nt);X.push($t.col,$t.row,Kt,qt),H++}if(M(ft,2,900)<.5){let Xt=M(ft,0,910)+1,qt=M(ft,0,920)*Math.PI*2,Yt=ht.x+Math.cos(qt)*At*.4,xt=ht.z+Math.sin(qt)*At*.4,Rt=ht.y-C*.5,Nt=Z(Yt,xt);X.push(Nt.col,Nt.row,Rt,Xt),H++}}let Q=q*ee*S,pt=C*1.2;for(let ft=0;ft<80;ft++){let ht=M(ft,0,4e3)*Math.PI*2,kt=M(ft,0,4100),mt=Q*(.1+kt*kt*.75),At=Math.cos(ht)*mt,It=Math.sin(ht)*mt,Xt=M(ft,0,4200),qt=Z(At,It);X.push(qt.col,qt.row,pt,Xt),H++}return{positions:new Float32Array(X),count:H}}function nt(Y,$,q=10){let G=$*S*.5,X=[],H=0;if(Y.length===0)return{positions:new Float32Array(q*4),count:0};for(let Z=0;Z<q;Z++){let Q=Y[Math.floor(M(Z,0,5e3)*Y.length)%Y.length],pt=M(Z,0,5100),ft=M(Z,0,5200)*Math.PI*2,ht=Q.radius*S*1.5*M(Z,0,5300),kt=Q.x+Math.cos(ft)*ht,mt=Q.z+Math.sin(ft)*ht,At=Q.y+C*(.5+M(Z,0,5400)*1),It=(kt+G)/S,Xt=(mt+G)/S;X.push(It,Xt,At,pt),H++}return{positions:new Float32Array(X),count:H}}function rt(Y,$,q=0){let G=Math.sin(Y*127.1+$*311.7+q*43.7)*43758.5;return G-Math.floor(G)}function it(Y,$){let q=[],G=0,X=5e4,H=Y/2,Z=Y/2,Q=Y*ee;for(let pt=0;pt<Y;pt++)for(let ft=0;ft<Y&&!(G>=X);ft++){let ht=ft-H,kt=pt-Z,mt=Math.sqrt(ht*ht+kt*kt);if(mt<2.5*2||!($&&$[pt]&&$[pt][ft])||mt<Q)continue;let At=14+Math.floor(rt(ft,pt,5100)*8);for(let It=0;It<At&&!(G>=X);It++){let Xt=rt(ft,pt,5200+It),qt=(rt(ft,pt,5300+It)-.5)*.85,Yt=(rt(ft,pt,5400+It)-.5)*.85,xt=S*(.5+rt(ft,pt,5500+It)*1.2);q.push(ft+qt,pt+Yt,Xt,xt),G++}}return{positions:new Float32Array(q),count:G}}function at(Y){return Y<.5?4*Y*Y*Y:1-(-2*Y+2)**3/2}function ot({canvasRef:Y,canvasWidth:$,canvasHeight:q,qrContent:G,isFlat:X,seasonRef:H}){let Z=(0,_.useRef)(null),Q=(0,_.useRef)(Date.now()),pt=(0,_.useRef)(0),ft=(0,_.useRef)(0),ht=(0,_.useRef)(Date.now()),kt=(0,_.useRef)(null),mt=(0,_.useRef)(null),At=(0,_.useRef)(null),It=(0,_.useRef)(null),Xt=(0,_.useRef)(null),qt=(0,_.useRef)(null),Yt=(0,_.useRef)(null),xt=(0,_.useRef)(null),Rt=(0,_.useRef)(null),Nt=(0,_.useRef)({numBlocks:0,gridSize:0}),Kt=(0,_.useRef)({flowerCount:0}),$t=(0,_.useRef)({segmentCount:0}),Bt=(0,_.useRef)({petalCount:0}),_t=(0,_.useRef)({grassCount:0}),Gt=(0,_.useRef)(G);Gt.current=G,(0,_.useEffect)(()=>{let Ut=kt.current,Vt=mt.current,Ot=At.current,Pt=It.current,Qt=Xt.current,Dt=qt.current,Tt=Yt.current,Lt=xt.current,nn=Rt.current;if(!Ut||!Vt||!Ot||!Pt||!Qt)return;let tn=Je(G),sn=Ze(tn);st(Ut,sn,{typeBuffer:Vt,posBuffer:Ot,heightBuffer:Pt,baseYBuffer:Qt}),Nt.current={numBlocks:sn.numBlocks,gridSize:sn.gridSize};let K=$e(tn),St=et(K,sn.gridSize);if($t.current={segmentCount:St.segmentCount},Tt){let Mt=new Float32Array(6e3);Mt.set(St.segments),Ut.queue.writeBuffer(Tt,0,Mt)}if(Dt){let Mt=tt(St.tips,K),Ht=Qe(tn),Jt=Mt.count+Ht.count,Wt=new Float32Array(ae*4);Wt.set(Mt.positions),Wt.set(new Float32Array(Ht.positions),Mt.count*4),Kt.current={flowerCount:Jt},Ut.queue.writeBuffer(Dt,0,Wt)}if(Lt){let Mt=nt(St.tips,sn.gridSize,10);Bt.current={petalCount:Mt.count};let Ht=new Float32Array(40);Ht.set(Mt.positions),Ut.queue.writeBuffer(Lt,0,Ht)}if(nn){let Mt=it(sn.gridSize,tn);_t.current={grassCount:Mt.count};let Ht=new Float32Array(oe*4);Ht.set(Mt.positions),Ut.queue.writeBuffer(nn,0,Ht)}},[G]);let Ft=(0,_.useCallback)(async()=>{try{if(!Y.current)return;let Ut=Y.current,Vt=Ut.getContext("webgpu");if(!Vt)return;let Ot=await navigator.gpu?.requestAdapter();if(!Ot)return;let Pt=await Ot.requestDevice();kt.current=Pt;let Qt=navigator.gpu.getPreferredCanvasFormat(),Dt=window.devicePixelRatio||1;Ut.width=$*Dt,Ut.height=q*Dt,Vt.configure({device:Pt,format:Qt,alphaMode:"premultiplied"});let Tt=Je(Gt.current),Lt=Ze(Tt);Nt.current={numBlocks:Lt.numBlocks,gridSize:Lt.gridSize};let nn=$e(Tt),tn=et(nn,Lt.gridSize);$t.current={segmentCount:tn.segmentCount};let sn=tt(tn.tips,nn),K=Qe(Tt);Kt.current={flowerCount:sn.count+K.count};let St=Pt.createBuffer({size:32,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),Mt=Pt.createBuffer({size:32,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),Ht=Pt.createBuffer({size:T*4,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST});mt.current=Ht;let Jt=Pt.createBuffer({size:T*16,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST});At.current=Jt;let Wt=Pt.createBuffer({size:T*4,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST});It.current=Wt;let ln=Pt.createBuffer({size:T*4,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST});Xt.current=ln;let vn=Pt.createBuffer({size:ae*16,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST});qt.current=vn;let yn=Pt.createBuffer({size:500*12*4,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST});Yt.current=yn;let Nr=Pt.createBuffer({size:oe*16,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST});Rt.current=Nr;let wl=Pt.createBuffer({size:32,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),kl=Pt.createBuffer({size:160,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST});xt.current=kl;let Ua=Pt.createBuffer({size:32,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});st(Pt,Lt,{typeBuffer:Ht,posBuffer:Jt,heightBuffer:Wt,baseYBuffer:ln});let wr=new Float32Array(ae*4);wr.set(sn.positions),wr.set(new Float32Array(K.positions),sn.count*4),Pt.queue.writeBuffer(vn,0,wr);let Zl=new Float32Array(500*12);Zl.set(tn.segments),Pt.queue.writeBuffer(yn,0,Zl);let Ql=it(Lt.gridSize,Tt);_t.current={grassCount:Ql.count};let Io=new Float32Array(oe*4);Io.set(Ql.positions),Pt.queue.writeBuffer(Nr,0,Io);let Xa=nt(tn.tips,Lt.gridSize,10);Bt.current={petalCount:Xa.count};let Kl=new Float32Array(40);Kl.set(Xa.positions),Pt.queue.writeBuffer(kl,0,Kl);let Jl=Pt.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.VERTEX,buffer:{type:"read-only-storage"}},{binding:2,visibility:GPUShaderStage.VERTEX,buffer:{type:"read-only-storage"}},{binding:3,visibility:GPUShaderStage.VERTEX,buffer:{type:"read-only-storage"}},{binding:4,visibility:GPUShaderStage.VERTEX,buffer:{type:"read-only-storage"}}]}),Va=Pt.createBindGroup({layout:Jl,entries:[{binding:0,resource:{buffer:St}},{binding:1,resource:{buffer:Ht}},{binding:2,resource:{buffer:Jt}},{binding:3,resource:{buffer:Wt}},{binding:4,resource:{buffer:ln}}]}),Ya=Pt.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}}]}),Bo=Pt.createBindGroup({layout:Ya,entries:[{binding:0,resource:{buffer:St}}]}),$n=Pt.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.VERTEX,buffer:{type:"read-only-storage"}}]}),ts=Pt.createBindGroup({layout:$n,entries:[{binding:0,resource:{buffer:St}},{binding:1,resource:{buffer:vn}}]}),Ga=Pt.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.VERTEX,buffer:{type:"read-only-storage"}}]}),Fo=Pt.createBindGroup({layout:Ga,entries:[{binding:0,resource:{buffer:Mt}},{binding:1,resource:{buffer:yn}}]}),Sl=Pt.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.VERTEX,buffer:{type:"read-only-storage"}}]}),ns=Pt.createBindGroup({layout:Sl,entries:[{binding:0,resource:{buffer:wl}},{binding:1,resource:{buffer:Nr}}]}),Ha=Pt.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.VERTEX,buffer:{type:"read-only-storage"}}]}),rs=Pt.createBindGroup({layout:Ha,entries:[{binding:0,resource:{buffer:Ua}},{binding:1,resource:{buffer:kl}}]}),ls=ct(Pt,Qt,Ya,{vertex:le,fragment:ue,depthWrite:!1,depthCompare:"always"}),xl=ct(Pt,Qt,Ya,{vertex:de,fragment:j,depthWrite:!1,depthCompare:"always",blend:{color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"}}}),jn=ct(Pt,Qt,Jl,{vertex:se,fragment:ce,depthWrite:!0,depthCompare:"less"}),ur=null;try{ur=ct(Pt,Qt,Ga,{vertex:me,fragment:he,depthWrite:!0,depthCompare:"less"}),console.log("Branch pipeline created, segments:",tn.segmentCount)}catch(Zn){console.error("Branch pipeline failed (non-fatal):",Zn)}let Xn=null;try{Xn=ct(Pt,Qt,Sl,{vertex:ge,fragment:_e,depthWrite:!0,depthCompare:"less"})}catch(Zn){console.error("Grass pipeline failed (non-fatal):",Zn)}let as=ct(Pt,Qt,$n,{vertex:fe,fragment:pe,depthWrite:!0,depthCompare:"less"}),$a=null;try{$a=ct(Pt,Qt,Ha,{vertex:ve,fragment:ye,depthWrite:!0,depthCompare:"less"})}catch(Zn){console.error("Falling flower pipeline failed (non-fatal):",Zn)}let os=Pt.createTexture({size:[Ut.width,Ut.height],format:"depth24plus",usage:GPUTextureUsage.RENDER_ATTACHMENT}),Lr=Ut.width/Ut.height,Cl=()=>{let Zn=Date.now(),Mr=Math.min((Zn-ht.current)/1e3,.05);ht.current=Zn;let Kr=X.current?1:0;ft.current+=(Kr-ft.current)*Math.min(1,4*Mr),Math.abs(ft.current-Kr)<.001&&(ft.current=Kr),pt.current=at(ft.current);let cr=(Zn-Q.current)/1e3,{numBlocks:Uo,gridSize:El}=Nt.current,{segmentCount:Pl}=$t.current,Tl=1-pt.current,ea=Math.sin(cr*.15)*.003*Tl,zl=Math.sin(cr*.11+1)*.002*Tl,Al=H?H.current:0,Xo=new Float32Array([Lr,cr,Uo,pt.current,El,ea,zl,Al]);Pt.queue.writeBuffer(St,0,Xo);let Vo=new Float32Array([Lr,cr,Pl,pt.current,El,ea,zl,Al]);Pt.queue.writeBuffer(Mt,0,Vo);let{grassCount:Nl}=_t.current,Yo=new Float32Array([Lr,cr,Nl,pt.current,El,ea,zl,Al]);Pt.queue.writeBuffer(wl,0,Yo);let{petalCount:ta}=Bt.current,Pr=new Float32Array([Lr,cr,ta,pt.current,El,ea,zl,Al]);Pt.queue.writeBuffer(Ua,0,Pr);let _n=Pt.createCommandEncoder(),qn=Vt.getCurrentTexture().createView(),kn=_n.beginRenderPass({colorAttachments:[{view:qn,clearValue:{r:0,g:0,b:0,a:0},loadOp:"clear",storeOp:"store"}],depthStencilAttachment:{view:os.createView(),depthClearValue:1,depthLoadOp:"clear",depthStoreOp:"store"}});kn.setPipeline(ls),kn.setBindGroup(0,Bo),kn.draw(3),kn.setPipeline(xl),kn.setBindGroup(0,Bo),kn.draw(6),kn.setPipeline(jn),kn.setBindGroup(0,Va),kn.draw(36*Uo),Nl>0&&Xn&&(kn.setPipeline(Xn),kn.setBindGroup(0,ns),kn.draw(3*Nl)),Pl>0&&ur&&(kn.setPipeline(ur),kn.setBindGroup(0,Fo),kn.draw(48*Pl));let{flowerCount:na}=Kt.current;na>0&&(kn.setPipeline(as),kn.setBindGroup(0,ts),kn.draw(150*na)),ta>0&&$a&&(kn.setPipeline($a),kn.setBindGroup(0,rs),kn.draw(150*ta)),kn.end(),Pt.queue.submit([_n.finish()]),Z.current=requestAnimationFrame(Cl)};Cl()}catch(Ut){console.error("WebGPU init failed:",Ut)}},[$,q,Y,X]);(0,_.useEffect)(()=>{let Ut=setTimeout(Ft,100);return()=>{clearTimeout(Ut),Z.current&&cancelAnimationFrame(Z.current)}},[Ft])}function st(Y,$,q){let{types:G,positions:X,heights:H,baseY:Z}=$,Q=new Uint32Array(T);Q.set(G),Y.queue.writeBuffer(q.typeBuffer,0,Q);let pt=new Float32Array(T*4);pt.set(X),Y.queue.writeBuffer(q.posBuffer,0,pt);let ft=new Float32Array(T);ft.set(H),Y.queue.writeBuffer(q.heightBuffer,0,ft);let ht=new Float32Array(T);ht.set(Z),Y.queue.writeBuffer(q.baseYBuffer,0,ht)}function ct(Y,$,q,G){let X={color:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"}},H=Y.createShaderModule({code:G.vertex}),Z=Y.createShaderModule({code:G.fragment});return H.getCompilationInfo().then(Q=>{for(let pt of Q.messages)pt.type==="error"&&console.error("Vertex shader error:",pt.message,"line:",pt.lineNum)}),Z.getCompilationInfo().then(Q=>{for(let pt of Q.messages)pt.type==="error"&&console.error("Fragment shader error:",pt.message,"line:",pt.lineNum)}),Y.createRenderPipeline({layout:Y.createPipelineLayout({bindGroupLayouts:[q]}),vertex:{module:H,entryPoint:"main"},fragment:{module:Z,entryPoint:"main",targets:[{format:$,blend:G.blend??X}]},primitive:{topology:"triangle-list",cullMode:"none"},depthStencil:{depthWriteEnabled:G.depthWrite,depthCompare:G.depthCompare,format:"depth24plus"}})}var lt=o(Y=>{var $=Symbol.for("react.transitional.element");function q(G,X,H){var Z=null;if(H!==void 0&&(Z=""+H),X.key!==void 0&&(Z=""+X.key),"key"in X)for(var Q in H={},X)Q!=="key"&&(H[Q]=X[Q]);else H=X;return X=H.ref,{$$typeof:$,type:G,key:Z,ref:X===void 0?null:X,props:H}}Y.jsx=q,Y.jsxs=q}),N=o((Y,$)=>{$.exports=lt()})();function ut(){let[Y,$]=(0,_.useState)({width:0,height:0}),q=(0,_.useRef)(null),G=(0,_.useRef)(null),X=(0,_.useRef)(!1),[H,Z]=(0,_.useState)(!1),[Q,pt]=(0,_.useState)(b),[ft,ht]=(0,_.useState)(b),[kt,mt]=(0,_.useState)(!1),[At,It]=(0,_.useState)(""),[Xt,qt]=(0,_.useState)(!0),Yt=(0,_.useRef)(0),[xt,Rt]=(0,_.useState)(0),Nt=(0,_.useCallback)($t=>{if($t){G.current=$t;let Bt=$t.getBoundingClientRect();$({width:Bt.width,height:Bt.height*.75})}},[]);Yt.current=xt,(0,_.useEffect)(()=>{let $t=Bt=>{if(Bt.origin!==window.location.origin)return;let _t=Bt.data;if(typeof _t!="object"||_t===null||_t.channel!=="gv-qr-tree"||_t.type!=="setSeason")return;let Gt=_t.season;typeof Gt=="number"&&Gt>=0&&Gt<=3&&Rt(Gt)};return window.addEventListener("message",$t),()=>window.removeEventListener("message",$t)},[]),ot({canvasRef:q,canvasWidth:Y.width,canvasHeight:Y.height,qrContent:ft,isFlat:X,seasonRef:Yt});let Kt=(0,_.useCallback)(()=>{X.current=!X.current,Z(X.current)},[]);return navigator.gpu?(0,N.jsxs)("div",{ref:Nt,style:P.container,children:[(0,N.jsx)("div",{style:P.canvasWrapper,children:(0,N.jsx)("canvas",{ref:q,onClick:Kt,style:{...P.canvas,width:Y.width,height:Y.height,maxWidth:"100%",maxHeight:"100%",cursor:"pointer"}})})]}):(0,N.jsx)("div",{style:P.container,children:(0,N.jsxs)("div",{style:P.errorMessage,children:[(0,N.jsx)("h2",{children:"WebGPU Not Supported"}),(0,N.jsx)("p",{children:"This demo requires WebGPU. Please use a browser that supports WebGPU (Chrome 113+, Edge 113+, or Firefox Nightly with flags enabled)."})]})})}var P={container:{backgroundColor:y,width:"100vw",height:"100vh",display:"flex",flexDirection:"column",overflow:"auto"},canvasWrapper:{flex:"1 1 0%",minHeight:0,display:"flex",alignItems:"center",justifyContent:"center",paddingTop:"10%"},canvas:{backgroundColor:"transparent"},helperText:{textAlign:"center",color:"#aaa",fontSize:12,fontWeight:400,letterSpacing:.3,paddingTop:4},inputContainer:{padding:"16px 12px 40px",maxWidth:400,width:"100%",alignSelf:"center",margin:"0 auto"},inputRow:{display:"flex",gap:8,alignItems:"center"},input:{flex:1,backgroundColor:"#fff",borderRadius:14,border:"none",boxShadow:"0px 1px 4px rgba(0, 0, 0, 0.03)",color:"#1a1a1a",fontSize:16,fontWeight:400,letterSpacing:.2,padding:"14px 18px",outline:"none",boxSizing:"border-box",fontFamily:"inherit",minWidth:0},submitBtn:{width:48,height:48,borderRadius:14,border:"none",backgroundColor:"#1a1a1a",color:"#fff",fontSize:20,fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"all 0.2s"},submitBtnDisabled:{backgroundColor:"#ccc",color:"#999",cursor:"not-allowed"},inputError:{boxShadow:"0px 0px 0px 2px rgba(220, 80, 80, 0.3)"},errorText:{color:"#dc5050",fontSize:12,fontWeight:500,marginTop:6,paddingLeft:4},seasonRow:{display:"flex",gap:6,marginTop:10},seasonBtn:{flex:1,padding:"8px 4px",borderRadius:10,border:"none",backgroundColor:"#f0f0f0",color:"#555",fontSize:12,fontWeight:500,cursor:"pointer",transition:"all 0.2s",fontFamily:"inherit"},seasonBtnActive:{backgroundColor:"#e8d5e0",color:"#1a1a1a",fontWeight:600},shareBtn:{width:"100%",marginTop:10,padding:"10px 0",borderRadius:10,border:"none",backgroundColor:"#f0f0f0",color:"#555",fontSize:13,fontWeight:500,cursor:"pointer",fontFamily:"inherit",transition:"all 0.2s"},errorMessage:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100%",padding:40,textAlign:"center",color:"#666"}};function dt(){return(0,N.jsx)(ut,{})}(0,v.createRoot)(document.getElementById("root")).render((0,N.jsx)(_.StrictMode,{children:(0,N.jsx)(dt,{})}));
