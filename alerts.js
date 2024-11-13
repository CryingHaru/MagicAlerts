 (function () {
    function showAlert(
      message,
      type = "info",
      options = {}
    ) {
      const alertDiv = document.createElement("div");
      alertDiv.role = "alert";

      alertDiv.className = `fixed z-1050 top-4 left-1/2 transform -translate-x-1/2 p-2 rounded-lg flex flex-col items-center transition duration-300 ease-in-out hover:scale-105 ${
        type === "info"
          ? "bg-blue-100 dark:bg-blue-900 border-l-4 border-blue-500 dark:border-blue-700 text-blue-900 dark:text-blue-100 hover:bg-blue-200 dark:hover:bg-blue-800"
          : type === "success"
            ? "bg-green-100 dark:bg-green-900 border-l-4 border-green-500 dark:border-green-700 text-green-900 dark:text-green-100 hover:bg-green-200 dark:hover:bg-green-800"
            : type === "warning"
              ? "bg-yellow-100 dark:bg-yellow-900 border-l-4 border-yellow-500 dark:border-yellow-700 text-yellow-900 dark:text-yellow-100 hover:bg-yellow-200 dark:hover:bg-yellow-800"
              : type === "confirm"
                ? "bg-gray-100 dark:bg-gray-900 border-l-4 border-gray-500 dark:border-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-800"
                : "bg-red-100 dark:bg-red-900 border-l-4 border-red-500 dark:border-red-700 text-red-900 dark:text-red-100 hover:bg-red-200 dark:hover:bg-red-800"
      }`;

      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("stroke", "currentColor");
      svg.setAttribute("viewBox", "0 0 24 24");
      svg.setAttribute("fill", "none");
      svg.classList.add("h-5", "w-5", "flex-shrink-0", "mr-2");
      const path = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      path.setAttribute(
        "d",
        "M13 16h-1v-4h1m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      );
      path.setAttribute("stroke-width", "2");
      path.setAttribute("stroke-linejoin", "round");
      path.setAttribute("stroke-linecap", "round");
      svg.appendChild(path);

      alertDiv.appendChild(svg);

      message.split("\n").forEach((line) => {
        const messageP = document.createElement("p");
        messageP.className = "text-xs font-semibold";
        messageP.textContent = line;
        alertDiv.appendChild(messageP);
      });

      if (type === "confirm") {
        const buttonContainer = document.createElement("div");
        buttonContainer.className = "flex space-x-2 mt-4";

        const cancelButton = document.createElement("button");
        cancelButton.className = "bg-red-500 text-white px-2 py-1 rounded";
        cancelButton.textContent = "Cancelar";
        cancelButton.onclick = () => {
          if (options.onCancel) options.onCancel();
          alertDiv.remove();
        };

        const acceptButton = document.createElement("button");
        acceptButton.className = "bg-green-500 text-white px-2 py-1 rounded";
        acceptButton.textContent = "Aceptar";
        acceptButton.onclick = () => {
          if (options.onAccept) options.onAccept();
          alertDiv.remove();
        };

        buttonContainer.appendChild(cancelButton);
        buttonContainer.appendChild(acceptButton);
        alertDiv.appendChild(buttonContainer);
      }

      
      //si hay un elemento dialog haz append sobre el
      if (document.querySelector("dialog")?.open) {
        document.querySelector("dialog").appendChild(alertDiv);
      } else {
        document.body.appendChild(alertDiv);
      }

      if (type !== "confirm") {
        setTimeout(() => {
          alertDiv.style.opacity = "0";
          alertDiv.style.transform = "translateY(-20px)";
          setTimeout(() => {
            alertDiv.remove();
          }, 300);
        }, options.duration || 3000);
      }
    }

    window.showAlert = showAlert;
  })();
