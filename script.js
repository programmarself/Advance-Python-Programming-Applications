document.addEventListener("DOMContentLoaded", () => {
  const notebookList = document.getElementById("notebook-list");

  // Reordered notebooks from basics to advanced
  const notebooks = [
    // Python Fundamentals
    {
      filename: "Python Lists.ipynb",
      url: "notebooks/Python Lists.ipynb"
    },
    {
      filename: "Python Tuples.ipynb",
      url: "notebooks/Python Tuples.ipynb"
    },
    {
      filename: "Python Dictionaries.ipynb",
      url: "notebooks/Python Dictionaries.ipynb"
    },
    {
      filename: "Functions.ipynb",
      url: "notebooks/Functions.ipynb"
    },
    {
      filename: "Iterators.ipynb",
      url: "notebooks/Iterators.ipynb"
    },
    {
      filename: "List Comprehension.ipynb",
      url: "notebooks/List Comprehension.ipynb"
    },
    {
      filename: "Lamda functions-Part1.ipynb",
      url: "notebooks/Lamda functions-Part1.ipynb"
    },
    {
      filename: "Lamda functions-Part2.ipynb",
      url: "notebooks/Lamda functions-Part2.ipynb"
    },
    {
      filename: "Python Exceptions.ipynb",
      url: "notebooks/Python Exceptions.ipynb"
    },
    {
      filename: "Python Files.ipynb",
      url: "notebooks/Python Files.ipynb"
    },
    {
      filename: "getcwd().ipynb",
      url: "notebooks/getcwd().ipynb"
    },

    // Object-Oriented Programming (OOP)
    {
      filename: "OOP1_Lecture1.ipynb",
      url: "notebooks/OOP1_Lecture1.ipynb"
    },
    {
      filename: "OOP_All_in_One.ipynb",
      url: "notebooks/OOP_All_in_One.ipynb"
    },

    // Numerical Computing (NumPy)
    {
      filename: "Numpy_lec1-part-a.ipynb",
      url: "notebooks/Numpy_lec1-part-a.ipynb"
    },
    {
      filename: "Numpy_lec2-3.ipynb",
      url: "notebooks/Numpy_lec2-3.ipynb"
    },
    {
      filename: "Numpy_Functions.ipynb",
      url: "notebooks/Numpy_Functions.ipynb"
    },

    // Data Analysis (Pandas)
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
      filename: "17-Selecting-Elements.ipynb",
      url: "notebooks/17-Selecting-Elements.ipynb"
    },

    // Machine Learning & NLP
    {
      filename: "KNN.ipynb",
      url: "notebooks/KNN.ipynb"
    },
    {
      filename: "Spam_ClassificationP1-7-May-2025.ipynb",
      url: "notebooks/Spam_ClassificationP1-7-May-2025.ipynb"
    },
    {
      filename: "Spam_ClassificationP2-9-5-2025.ipynb",
      url: "notebooks/Spam_ClassificationP2-9-5-2025.ipynb"
    },
    {
      filename: "Spam_ClassificationP3-14-May.ipynb",
      url: "notebooks/Spam_ClassificationP3-14-May.ipynb"
    },
    {
      filename: "Spam_Classification-16-May.ipynb",
      url: "notebooks/Spam_Classification-16-May.ipynb"
    },
    {
      filename: "Spam_Classification-bigrams.ipynb",
      url: "notebooks/Spam_Classification-bigrams.ipynb"
    },
    {
      filename: "n_gram of spam classification.ipynb",
      url: "notebooks/n_gram of spam classification.ipynb"
    },
    {
      filename: "n_gram of urdu dataset.ipynb",
      url: "notebooks/n_gram of urdu dataset.ipynb"
    },
    {
      filename: "Deep_learning.ipynb",
      url: "notebooks/Deep_learning.ipynb"
    },

    // Datasets
    {
      filename: "spam.csv",
      url: "notebooks/spam.csv"
    },
    {
      filename: "English.csv",
      url: "notebooks/English.csv"
    },
    
     {
      filename: "Advanced-Python-Programming-and-Applications.pdf",
      url: "notebooks/Advanced-Python-Programming-and-Applications.pdf"
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
