function DialogBox(options) {
    var DIALOG,
        CONTENT,
        CLOSEBUTTON,
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
        overlay: OVERLAY
    };
    this.show = showDialog;
    this.close = closeDialog;


    // EXECUÇÃO

    if (!getElements())
        setDialog();


    // FUNÇÕES

    function getElements() {
        DIALOG = document.querySelector(".db");
        CONTENT = document.querySelector(".db-content");
        CLOSEBUTTON = document.querySelector(".db-button-close");
        OVERLAY = document.querySelector(".db-overlay");

        return DIALOG;
    }

    function setDialog() {
        document.body.insertAdjacentHTML(
            "beforeend",
            '<div class="db-overlay db-overlay-closed">' +
                '<div class="db db-closed">' +
                    '<div class="db-button-close">&#10006;</div>' +
                    '<div class="db-content"></div>' +
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

            DIALOG.classList.remove("db-closed");
            DIALOG.classList.add("db-opened");
            OVERLAY.classList.remove("db-overlay-closed");
            OVERLAY.classList.add("db-overlay-opened");
        }, 0);

        if (options.onShow)
            options.onShow(args);
    }

    function closeDialog(args) {
        DIALOG.classList.remove("db-opened");
        DIALOG.classList.add("db-closed");
        OVERLAY.classList.remove("db-overlay-opened");
        OVERLAY.classList.add("db-overlay-closed");

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
