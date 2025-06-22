document.addEventListener("DOMContentLoaded", () => {
  const notebookList = document.getElementById("notebook-list");

  const notebooks = [
    {
      filename: "12-13-Pandas Intro.ipynb",
      url: "notebooks/12-13-Pandas Intro.ipynb"
    },
    {
      filename: "13 Dataframes Updated.ipynb",
      url: "notebooks/13-Dataframes-updated.ipynb"
    },
    {
      filename: "16 Summary Statistics.ipynb",
      url: "notebooks/16-Pandas%20Dataframes-Summary%20Statistics.ipynb"
    },
    {
      filename: "Iterators.ipynb",
      url: "notebooks/Iterators.ipynb"
    },
     {
      filename: "17-Selecting-Elements.ipynb",
      url: "notebooks/17-Selecting-Elements.ipynb"
    }
  ];

  if (notebookList) {
    notebooks.forEach(nb => {
      const notebookItem = document.createElement("div");
      notebookItem.className = "notebook-item";

      notebookItem.innerHTML = `
        <p class="notebook-name">${nb.filename}</p>
        <button class="download-btn" data-filename="${nb.filename}" data-url="${nb.url}">
          Download
        </button>
      `;

      const downloadBtn = notebookItem.querySelector('.download-btn');
      downloadBtn.addEventListener('click', function () {
        const filename = this.getAttribute('data-filename');
        const url = this.getAttribute('data-url');
        forceDownload(url, filename, this);
      });

      notebookList.appendChild(notebookItem);
    });
  }
});

function forceDownload(url, filename, btn) {
  const originalText = btn.textContent;
  btn.textContent = "Preparing...";
  btn.disabled = true;

  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error("File not found");
      return response.blob();
    })
    .then(blob => {
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(blobUrl);

      btn.textContent = "Downloaded!";
      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
      }, 1500);
    })
    .catch(error => {
      alert("Download error: " + error.message);
      btn.textContent = originalText;
      btn.disabled = false;
    });
}
