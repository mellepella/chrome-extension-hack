chrome.webNavigation.onDOMContentLoaded.addListener(() => {
  chrome.tabs.getSelected(null, (tab) => {
    try {
      const code = `
        var maxHackChance = 0.000030;
        var minChance = 0.000015;
        var startedAt = new Date().getTime();
        var msUntilChaos = 60 * 1000;

        var chance = () => {
          const elapsedMs = new Date() - startedAt;
          return (elapsedMs / msUntilChaos) * maxHackChance;
        }

        document.addEventListener("mousemove", (ev) => {
          Array.prototype.slice.call(document.querySelectorAll("*")).forEach((el) => {
            el.style.transition = "all 1s ease-out";
            if (Math.random() < chance()) {
              el.style.position = "relative";
              el.style.left = -10 + Math.random() * 20 + "px";
            }

            if (Math.random() < chance()) {
              el.style.transform = \`rotate3d(1, 1, 1, \${Math.random() * 90}deg) scale(\${Math.random() * 1.5})\`;
            }

            if (Math.random() < chance()) {
              el.style.color = \`rgb(\${Math.random() * 255}, \${Math.random() * 255}, \${
                Math.random() * 255
              })\`;
            }

            if (Math.random() < chance()) {
              el.style.background = \`rgb(\${Math.random() * 255}, \${
                Math.random() * 255
              }, \${Math.random() * 255})\`;
            }
          });

          Array.prototype.slice.call(document.querySelectorAll("img")).forEach((el) => {
            if (Math.random() < chance()) {
              el.src = \`https://picsum.photos/\${Math.round(
                200 * Math.random()
              )}/\${Math.random(300 * Math.random())}\`;
            }
          });
        });
      `;
      chrome.tabs.executeScript(tab.tabId, { code });
    } catch (e) {}
  });
});
