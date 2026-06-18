const cdnAssets = {
  connections: [
    { href: "https://cdn.jsdelivr.net", crossOrigin: true },
    { href: "https://fonts.googleapis.com" },
    { href: "https://fonts.gstatic.com", crossOrigin: true },
  ],
  styles: [
    "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css",
    "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css",
    "https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&display=swap",
  ],
  scripts: [
    "https://code.jquery.com/jquery-3.7.1.min.js",
    "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js",
  ],
};

const prepareConnections = (connections) => {
  const fragment = document.createDocumentFragment();

  connections.forEach(({ href, crossOrigin }) => {
    const link = document.createElement("link");
    link.rel = "preconnect";
    link.href = href;

    if (crossOrigin) {
      link.crossOrigin = "anonymous";
    }

    fragment.appendChild(link);
  });

  document.head.appendChild(fragment);
};

const loadStyles = (urls) => {
  const fragment = document.createDocumentFragment();

  urls.forEach((href) => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    fragment.appendChild(link);
  });

  document.head.appendChild(fragment);
};

const loadScripts = (urls) => {
  const loadNext = (index) => {
    if (index >= urls.length) {
      window.dispatchEvent(new Event("cdnAssetsReady"));
      return;
    }

    const script = document.createElement("script");
    script.src = urls[index];
    script.defer = true;
    script.onload = () => loadNext(index + 1);
    document.body.appendChild(script);
  };

  loadNext(0);
};

prepareConnections(cdnAssets.connections);
loadStyles(cdnAssets.styles);

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => loadScripts(cdnAssets.scripts), { once: true });
} else {
  loadScripts(cdnAssets.scripts);
}
