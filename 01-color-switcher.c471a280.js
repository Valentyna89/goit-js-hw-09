!function(){var t,n={startBtn:document.querySelector("[data-start]"),stopBtn:document.querySelector("[data-stop]")};function a(){var t="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0));document.body.style.backgroundColor=t}n.startBtn.addEventListener("click",(function(){a(),t=setInterval(a,1e3),n.startBtn.disabled=!0,n.stopBtn.disabled=!1})),n.stopBtn.addEventListener("click",(function(){clearInterval(t),n.stopBtn.disabled=!0,n.startBtn.disabled=!1}))}();
//# sourceMappingURL=01-color-switcher.c471a280.js.map
