function DialogBox(options) {
	var DIALOG,
		CLOSEBUTTON,
		CONTENT,
		OVERLAY;

	options = options ? options : {};
	options.content = options.content || null;
	options.append = options.append || null;
	options.width = typeof options.width !== "undefined" ? options.width + "px" : "auto";
	options.height = typeof options.height !== "undefined" ? options.height + "px" : "auto";
	options.closeOut = typeof options.closeOut !== "undefined" ? options.closeOut : true;
	options.transitionTime = options.transitionTime || 200;


	// PÚBLICO

	this.options = options;
	this.elements = {
		dialog: DIALOG,
		closeButton: CLOSEBUTTON,
		content: CONTENT,
		overlay: OVERLAY
	};
	this.show = showDialog;
	this.close = closeDialog;


	// EXECUÇÃO

	if (!getElements())
		setDialog();


	// FUNÇÕES

	function getElements() {
		DIALOG = document.querySelector(".dialog-box");
		CLOSEBUTTON = document.querySelector(".dialog-box-button-close");
		CONTENT = document.querySelector(".dialog-box-content");
		OVERLAY = document.querySelector(".dialog-box-overlay");

		return DIALOG;
	}

	function setDialog() {
		document.body.insertAdjacentHTML(
			"beforeend",
			'<div class="dialog-box-overlay dialog-box-overlay-closed">' +
			'<div class="dialog-box dialog-box-closed">' +
			'<div class="dialog-box-button-close">&#10006;</div>' +
			'<div class="dialog-box-content"></div>' +
			'</div>' +
			'</div>'
		);

		getElements();

		// eventos
		CLOSEBUTTON.onclick = closeDialog;
		OVERLAY.onclick = function() {
			if (event.target === OVERLAY && OVERLAY.getAttribute("closeout") === "true")
				closeDialog();
		};
	}

	function showDialog(args) {
		if (options.append) {
			options.append.style.display = "block";
			CONTENT.innerHTML = "";
			CONTENT.appendChild(options.append);
		} else {
			CONTENT.innerHTML = options.content;
		}

		// transition
		DIALOG.style.transition = "none";
		DIALOG.style.webkitTransition = "none";

		// propriedades
		DIALOG.style.width = options.width;
		DIALOG.style.height = options.height;
		OVERLAY.setAttribute("closeout", options.closeOut);

		setTimeout(function() {
			// transition
			DIALOG.style.transition = "all " + options.transitionTime + "ms";
			DIALOG.style.webkitTransition = "all " + options.transitionTime + "ms";

			DIALOG.classList.remove("dialog-box-closed");
			DIALOG.classList.add("dialog-box-opened");
			OVERLAY.classList.remove("dialog-box-overlay-closed");
			OVERLAY.classList.add("dialog-box-overlay-opened");
		}, 0);

		if (options.onShow)
			options.onShow(args);
	}

	function closeDialog(args) {
		DIALOG.classList.remove("dialog-box-opened");
		DIALOG.classList.add("dialog-box-closed");
		OVERLAY.classList.remove("dialog-box-overlay-opened");
		OVERLAY.classList.add("dialog-box-overlay-closed");

		if (options.append) {
			setTimeout(function() {
				options.append.style.display = "none";
				document.body.appendChild(options.append);
			}, options.transitionTime);
		}

		if (options.onClose)
			options.onClose(args);
	}
}
