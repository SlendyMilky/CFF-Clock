/*
 * Digital SBB Uhr V 1.3 (marke@sbb.ch)
 * All rights reserves by SBB AG, Switzerland.
 * Apache-2.0 License
 */
function sbbUhr(container, background = false, fps = false) {
	//Check if selected container is valid
	if (!document.getElementById(container)) return console.log("Select exaclty 1 container to place the clock inside!"), !1;
	if(typeof background == "number") {
		fps = background;
		background = false;
	}
	if (typeof background !== "boolean") background = false;
	if (typeof fps !== "number") fps = false;
	//Construct SBB Uhr Object
	var c = this;
	c.container = document.getElementById(container);
	c.cycleDur = 58.5; // Seconds Hand Cycle duration in Seconds
	c.easingDur = 2000; //Easing Time in Milliseconds
	c.date, c.anim, c.sDeg, c.mDeg, c.hDeg, c.rTime = {};
	c.easeOutElastic = function(t, b, c, d) { 	//Easing funciton for hours and minutes Hand Animation t = Milliseconds of Minute, b = Start Position in Degrees, c = Increment in Degrees to animate, d = Duration of Animation in Milliseconds
		t/=d;
		if(t < 1) return c*Math.pow(2,-10*t) * Math.sin((t*d-2)*(2*Math.PI)/300)*1.5 + c + b;
		else return b + c;
	}
	c.rotateHand = function(target, prevPos, position) { 	// Set new rotation angle for Hands
		if(prevPos != position) {
			target.style.transform = "rotate("+position+"deg)";
		}
		return position;
	}
	c.size = Math.min(c.container.clientWidth, c.container.clientHeight);	//Get size of parent element and set size of SBB Uhr
	//Clock face and hands as svg elements
	c.svg = {
		face: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 112 112" enable-background="new 0 0 112 112" xml:space="preserve"> <g> <circle fill="rgba(255,255,255,1)" cx="56" cy="56" r="52.5"/> <path fill="rgba(118,118,118,1)" d="M56,3.5c28.995,0,52.5,23.505,52.5,52.5S84.995,108.5,56,108.5S3.5,84.995,3.5,56 S27.005,3.5,56,3.5 M56,2C26.224,2,2,26.224,2,56s24.224,54,54,54s54-24.224,54-54S85.776,2,56,2L56,2z"/> <path fill="rgba(30,30,30,1)" d="M51.627,7.693l0.366,3.481L50.6,11.32l-0.366-3.481L51.627,7.693z M54.25,19.5h3.5v-12h-3.5V19.5z M54.25,104.5h3.5v-12h-3.5V104.5z M72.734,23.515l3.031,1.75l6-10.392l-3.031-1.75L72.734,23.515z M30.234,97.127l3.031,1.75 l6-10.392l-3.031-1.75L30.234,97.127z M88.485,39.266l10.392-6l-1.75-3.031l-10.392,6L88.485,39.266z M23.515,72.734l-10.392,6 l1.75,3.031l10.392-6L23.515,72.734z M92.5,54.25v3.5h12v-3.5H92.5z M19.5,54.25h-12v3.5h12V54.25z M86.735,75.766l10.392,6 l1.75-3.031l-10.392-6L86.735,75.766z M25.265,36.234l-10.392-6l-1.75,3.031l10.392,6L25.265,36.234z M72.734,88.485l6,10.392 l3.031-1.75l-6-10.392L72.734,88.485z M30.234,14.873l6,10.392l3.031-1.75l-6-10.392L30.234,14.873z M60.008,11.173L61.4,11.32 l0.366-3.481l-1.392-0.146L60.008,11.173z M50.234,104.161l1.392,0.146l0.366-3.481L50.6,100.68L50.234,104.161z M64.671,11.838 l1.369,0.291l0.728-3.424l-1.369-0.291L64.671,11.838z M45.232,103.295l1.369,0.291l0.728-3.424l-1.369-0.291L45.232,103.295z M69.24,12.986l1.331,0.433l1.082-3.329l-1.331-0.433L69.24,12.986z M40.347,101.91l1.331,0.433l1.082-3.329l-1.331-0.433 L40.347,101.91z M76.366,11.978l-1.279-0.569l-1.424,3.197l1.279,0.569L76.366,11.978z M35.634,100.022l1.279,0.569l1.424-3.197 l-1.279-0.569L35.634,100.022z M81.884,19.183l1.133,0.823l2.057-2.832l-1.133-0.823L81.884,19.183z M26.926,94.826l1.133,0.823 l2.057-2.832l-1.133-0.823L26.926,94.826z M88.973,20.426l-1.04-0.937l-2.342,2.601l1.04,0.937L88.973,20.426z M23.027,91.574 l1.04,0.937l2.342-2.601l-1.04-0.937L23.027,91.574z M92.511,24.067l-0.937-1.04l-2.601,2.342l0.937,1.04L92.511,24.067z M19.489,87.933l0.937,1.04l2.601-2.342l-0.937-1.04L19.489,87.933z M92.817,30.116l2.832-2.057l-0.823-1.133l-2.832,2.057 L92.817,30.116z M19.183,81.884l-2.832,2.057l0.823,1.133l2.832-2.057L19.183,81.884z M97.394,38.336l3.197-1.424l-0.569-1.279 l-3.197,1.424L97.394,38.336z M14.606,73.664l-3.197,1.424l0.569,1.279l3.197-1.424L14.606,73.664z M99.014,42.76l3.329-1.082 l-0.433-1.331l-3.329,1.082L99.014,42.76z M12.986,69.24l-3.329,1.082l0.433,1.331l3.329-1.082L12.986,69.24z M100.162,47.329 l3.424-0.728l-0.291-1.369l-3.424,0.728L100.162,47.329z M11.838,64.671l-3.424,0.728l0.291,1.369l3.424-0.728L11.838,64.671z M100.827,51.992l3.481-0.366l-0.146-1.392L100.68,50.6L100.827,51.992z M11.173,60.008l-3.481,0.366l0.146,1.392L11.32,61.4 L11.173,60.008z M100.68,61.4l3.481,0.366l0.146-1.392l-3.481-0.366L100.68,61.4z M11.32,50.6l-3.481-0.366l-0.146,1.392 l3.481,0.366L11.32,50.6z M99.871,66.041l3.424,0.728l0.291-1.369l-3.424-0.728L99.871,66.041z M12.129,45.959l-3.424-0.728 l-0.291,1.369l3.424,0.728L12.129,45.959z M98.581,70.571l3.329,1.082l0.433-1.331l-3.329-1.082L98.581,70.571z M13.419,41.428 l-3.329-1.082l-0.433,1.331l3.329,1.082L13.419,41.428z M96.825,74.943l3.197,1.424l0.569-1.279l-3.197-1.424L96.825,74.943z M15.175,37.057l-3.197-1.424l-0.569,1.279l3.197,1.424L15.175,37.057z M91.994,83.017l2.832,2.057l0.823-1.133l-2.832-2.057 L91.994,83.017z M20.006,28.983l-2.832-2.057l-0.823,1.133l2.832,2.057L20.006,28.983z M88.973,86.631l2.601,2.342l0.937-1.04 l-2.601-2.342L88.973,86.631z M23.027,25.369l-2.601-2.342l-0.937,1.04l2.601,2.342L23.027,25.369z M85.591,89.91l2.342,2.601 l1.04-0.937l-2.342-2.601L85.591,89.91z M23.027,20.426l2.342,2.601l1.04-0.937l-2.342-2.601L23.027,20.426z M81.884,92.817 l2.057,2.832l1.133-0.823l-2.057-2.832L81.884,92.817z M26.926,17.174l2.057,2.832l1.133-0.823l-2.057-2.832L26.926,17.174z M73.664,97.394l1.424,3.197l1.279-0.569l-1.424-3.197L73.664,97.394z M38.336,14.606l-1.424-3.197l-1.279,0.569l1.424,3.197 L38.336,14.606z M69.24,99.014l1.082,3.329l1.331-0.433l-1.082-3.329L69.24,99.014z M40.347,10.09l1.082,3.329l1.331-0.433 l-1.082-3.329L40.347,10.09z M64.671,100.162l0.728,3.424l1.369-0.291l-0.728-3.424L64.671,100.162z M45.232,8.705l0.728,3.424 l1.369-0.291l-0.728-3.424L45.232,8.705z M60.008,100.827l0.366,3.481l1.392-0.146L61.4,100.68L60.008,100.827z"/> </g> </svg>',
		faceDark: '<svg version="1.0" id="Ebene_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 112 112" enable-background="new 0 0 112 112" xml:space="preserve"><g><circle fill="rgba(255,255,255,1)" cx="56" cy="56" r="52.5"/><path fill="rgba(30,30,30,1)" d="M51.627,7.693l0.366,3.481l-1.392,0.146l-0.366-3.481L51.627,7.693z M54.25,19.5h3.5v-12h-3.5V19.5zM54.25,104.499h3.5v-12h-3.5V104.499z M72.734,23.515l3.031,1.75l6-10.392l-3.031-1.75L72.734,23.515z M30.234,97.126l3.031,1.75l6-10.392l-3.031-1.75L30.234,97.126z M88.484,39.266l10.392-6l-1.75-3.031l-10.392,6L88.484,39.266z M23.515,72.734l-10.392,6l1.75,3.031l10.392-6L23.515,72.734z M92.499,54.25v3.5h12v-3.5H92.499z M19.5,54.25h-12v3.5h12V54.25z M86.734,75.766l10.392,6l1.75-3.031l-10.392-6L86.734,75.766z M25.265,36.234l-10.392-6l-1.75,3.031l10.392,6L25.265,36.234z M72.734,88.484l6,10.392l3.031-1.75l-6-10.392L72.734,88.484z M30.234,14.873l6,10.392l3.031-1.75l-6-10.392L30.234,14.873z M60.007,11.174l1.392,0.146l0.366-3.481l-1.392-0.146L60.007,11.174z M50.233,104.161l1.392,0.146l0.366-3.481l-1.392-0.146L50.233,104.161z M64.672,11.838l1.369,0.291l0.728-3.424l-1.369-0.291L64.672,11.838z M45.231,103.294l1.369,0.291l0.728-3.424l-1.369-0.291L45.231,103.294zM69.24,12.986l1.331,0.433l1.082-3.329l-1.331-0.433L69.24,12.986z M40.346,101.91l1.331,0.433l1.082-3.329l-1.331-0.433L40.346,101.91z M76.366,11.978l-1.279-0.569l-1.424,3.197l1.279,0.569L76.366,11.978z M35.633,100.021l1.279,0.569l1.424-3.197l-1.279-0.569L35.633,100.021z M81.883,19.183l1.133,0.823l2.057-2.832l-1.133-0.823L81.883,19.183z M26.925,94.826l1.133,0.823l2.057-2.832l-1.133-0.823L26.925,94.826z M88.973,20.425l-1.04-0.937l-2.342,2.601l1.04,0.937L88.973,20.425z M23.026,91.574l1.04,0.937l2.342-2.601l-1.04-0.937L23.026,91.574z M92.51,24.067l-0.937-1.04l-2.601,2.342l0.937,1.04L92.51,24.067zM19.489,87.932l0.937,1.04l2.601-2.342l-0.937-1.04L19.489,87.932z M92.816,30.116l2.832-2.057l-0.823-1.133l-2.832,2.057L92.816,30.116z M19.183,81.883l-2.832,2.057l0.823,1.133l2.832-2.057L19.183,81.883z M97.395,38.337l3.197-1.424l-0.569-1.279l-3.197,1.424L97.395,38.337z M14.605,73.663l-3.197,1.424l0.569,1.279l3.197-1.424L14.605,73.663z M99.014,42.759l3.329-1.082l-0.433-1.331l-3.329,1.082L99.014,42.759z M12.986,69.24l-3.329,1.082l0.433,1.331l3.329-1.082L12.986,69.24z M100.161,47.328l3.424-0.728l-0.291-1.369l-3.424,0.728L100.161,47.328z M11.838,64.672l-3.424,0.728l0.291,1.369l3.424-0.728L11.838,64.672zM100.827,51.993l3.481-0.366l-0.146-1.392l-3.481,0.366L100.827,51.993z M11.174,60.007l-3.481,0.366l0.146,1.392l3.481-0.366L11.174,60.007z M100.68,61.399l3.481,0.366l0.146-1.392l-3.481-0.366L100.68,61.399z M11.319,50.6l-3.481-0.366l-0.146,1.392l3.481,0.366L11.319,50.6z M99.87,66.04l3.424,0.728l0.291-1.369l-3.424-0.728L99.87,66.04z M12.129,45.96l-3.424-0.728l-0.291,1.369l3.424,0.728L12.129,45.96z M98.581,70.572l3.329,1.082l0.433-1.331l-3.329-1.082L98.581,70.572z M13.418,41.428l-3.329-1.082l-0.432,1.332l3.329,1.082L13.418,41.428z M96.824,74.942l3.197,1.424l0.569-1.279l-3.197-1.424L96.824,74.942zM15.174,37.058l-3.197-1.424l-0.569,1.279l3.197,1.424L15.174,37.058z M91.995,83.016l2.832,2.057l0.823-1.133l-2.832-2.057L91.995,83.016z M20.006,28.983l-2.832-2.057L16.35,28.06l2.832,2.057L20.006,28.983z M88.973,86.63l2.601,2.342l0.937-1.04L89.91,85.59L88.973,86.63z M23.026,25.368l-2.601-2.342l-0.937,1.04l2.601,2.342L23.026,25.368z M85.59,89.91l2.342,2.601l1.04-0.937l-2.342-2.601L85.59,89.91z M23.026,20.425l2.342,2.601l1.04-0.937l-2.342-2.601L23.026,20.425z M81.883,92.816l2.057,2.832l1.133-0.823l-2.057-2.832L81.883,92.816z M26.925,17.174l2.057,2.832l1.133-0.823l-2.057-2.832L26.925,17.174zM73.663,97.393l1.424,3.197l1.279-0.569l-1.424-3.197L73.663,97.393z M38.337,14.605l-1.424-3.197l-1.279,0.569l1.424,3.197L38.337,14.605z M69.24,99.014l1.082,3.329l1.331-0.433l-1.082-3.329L69.24,99.014z M40.346,10.09l1.082,3.329l1.331-0.433l-1.081-3.328L40.346,10.09z M64.672,100.161l0.728,3.424l1.369-0.291l-0.728-3.424L64.672,100.161z M45.231,8.706l0.728,3.424l1.369-0.291l-0.728-3.424L45.231,8.706z M60.007,100.827l0.366,3.481l1.392-0.146l-0.366-3.481L60.007,100.827z"/></g></svg>',
		hours: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 112 112" enable-background="new 0 0 112 112" xml:space="preserve"><polygon fill="rgba(0,0,0,1)" points="59.2,68 52.8,68 53.4,24 58.6,24 "/></svg>',
		minutes: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 112 112" enable-background="new 0 0 112 112" xml:space="preserve"><polygon fill="rgba(0,0,0,1)" points="58.6,68 53.4,68 54.2,10 57.8,10 "/></svg>',
		seconds: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 112 112" enable-background="new 0 0 112 112" xml:space="preserve"><path fill="rgba(235,0,0,1)" d="M61.25,24.8c0-2.899-2.351-5.25-5.25-5.25s-5.25,2.351-5.25,5.25c0,2.66,1.985,4.834,4.55,5.179V72.5h1.4V29.979C59.265,29.634,61.25,27.46,61.25,24.8z"/></svg>'
	}
	c.createComponent = function(id, svg) { 	//Prototype DOM object for face and hands
		var div = document.createElement("div");
		div.setAttribute("id", id);
		div.setAttribute("style", "width: 100%; height: 100%; position: absolute; top: 0; left: 0; border: 0;");
		div.innerHTML = "<img alt='" + id + "' src='data:image/svg+xml," + encodeURI(svg) + "' />";
		return div;
	}
	c.wrapper = document.createElement("div");	//Build wrapper element, set attributes and inline style
	c.wrapper.setAttribute("id", "sbb_uhr_wrapper");
	c.wrapper.setAttribute("style", "display:block; position: absolute; width: " + c.size + "px; height: " + c.size + "px; overflow: hidden; margin: 0;");
	c.face = c.wrapper.appendChild(c.createComponent("sbb_uhr_face", background ? c.svg.faceDark : c.svg.face));	//Build Face and Hands DOM Elements
	c.hoursHand = c.wrapper.appendChild(c.wrapper.appendChild(c.createComponent("sbb_uhr_hours", c.svg.hours)));
	c.minutesHand = c.wrapper.appendChild(c.createComponent("sbb_uhr_minutes", c.svg.minutes));
	c.secondsHand = c.wrapper.appendChild(c.createComponent("sbb_uhr_seconds", c.svg.seconds));
	c.container.appendChild(c.wrapper);
	c.run = function() {	//Function gets called every frame, gets the current time and sets the correct angles to the hands
		c.date = new Date();
		c.rTime = {
			h: c.date.getHours(),
			m: c.date.getMinutes(),
			s: c.date.getSeconds(),
			ms: c.date.getMilliseconds(),
			mss: c.date.getSeconds() * 1000 + c.date.getMilliseconds()
		};
		c.sDeg = c.rotateHand(c.secondsHand, c.sDeg, Math.min(c.rTime.s * (360 / c.cycleDur) + (c.rTime.ms * .006), 360));
		c.mDeg = c.rotateHand(c.minutesHand, c.mDeg, c.easeOutElastic(c.rTime.mss , (c.rTime.m * 6)-6 , 6 , c.easingDur));
		c.hDeg = c.rotateHand(c.hoursHand, c.hDeg, c.easeOutElastic(c.rTime.mss, (c.rTime.h * 30) + (c.rTime.m / 2)-.5 , .5 , c.easingDur));
		c.fps = setTimeout(function() {
			c.anim = requestAnimationFrame(c.run);
		}, !fps ? 0 : 1000/fps);
	}
	c.start = function () {	//function start can be called to start the clock
		c.stop();
		c.run();
	}
	c.stop = function () {	//function stop can be called to stop the clock
		clearTimeout(c.fps);
		cancelAnimationFrame(c.anim);
	}
}
