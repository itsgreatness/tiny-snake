# tiny-snake
snake game that lives in a bookmark! have clicked the bookmark at least once and press RCTRL to hide/show + pause/play

# how to install
create a bookmark and change the url to javascript: + paste code from minified.js
## !IMPORTANT! i will try to keep index.html and minified.js updated but you should probably copy ./sources/main.js instead !IMPORTANT!
anyway heres a [bookmarklet](javascript:%21function%28%29%7Bif%28%22boolean%22%21%3Dtypeof%20window.active%29%7Bvar%20e%2Cn%3Dfunction%28%29%7Bwindow.clearTimeout%28e%29%2Cwindow.active%3F%28e%3Dwindow.setTimeout%28%28function%28%29%7BE%3D%211%2CrequestAnimationFrame%28k%29%7D%29%2C3e3%29%2Cwindow.popup.style.display%3D%22inline-block%22%2Cwindow.popup.focus%28%29%29%3A%28E%3D%210%2Cwindow.active%3D%211%2Cwindow.popup.style.display%3D%22none%22%2Cwindow.focusedElement.focus%28%7BfocusVisible%3A%210%7D%29%29%7D%3Blet%20D%3Bwindow.focusedElement%3Ddocument.activeElement%2Cwindow.active%3D%21window.active%3F%3F%210%3Blet%20S%3D%5B0%2C0%5D%3Bwindow.popup%3Ddocument.createElement%28%22div%22%29%2Cwindow.popup.id%3D%22game%22%3Blet%20T%3D%211%3Bwindow.popup.style.all%3D%22initial%22%2Cwindow.popup.style.display%3D%22inline-block%22%2Cwindow.popup.style.position%3D%22fixed%22%2Cwindow.popup.style.left%3D%220px%22%2Cwindow.popup.style.top%3D%220px%22%2Cwindow.popup.style.margin%3D%220px%200px%200px%200px%22%2Cwindow.popup.style.padding%3D%220px%200px%200px%200px%22%2Cwindow.popup.style.zIndex%3D9999%2Cwindow.popup.tabIndex%3D0%2Cwindow.popup.addEventListener%28%22mousedown%22%2C%28function%28e%29%7BT%3D%210%2CS%3D%5Bwindow.popup.offsetLeft-e.clientX%2Cwindow.popup.offsetTop-e.clientY%5D%7D%29%2C%210%29%2Cdocument.addEventListener%28%22mouseup%22%2C%28function%28%29%7BT%3D%211%7D%29%2C%210%29%2Cdocument.addEventListener%28%22mousemove%22%2C%28function%28e%29%7Be.preventDefault%28%29%2CT%26%26%28D%3D%7Bx%3Ae.clientX%2Cy%3Ae.clientY%7D%2Cwindow.popup.style.left%3DD.x%2BS%5B0%5D%2B%22px%22%2Cwindow.popup.style.top%3DD.y%2BS%5B1%5D%2B%22px%22%29%7D%29%2C%210%29%2Cdocument.addEventListener%28%22focus%22%2C%28function%28e%29%7Bdocument.activeElement%21%3Dwindow.popup%26%26%28window.focusedElement%3Ddocument.activeElement%29%7D%29%2C%210%29%2Cdocument.addEventListener%28%22keydown%22%2C%28function%28e%29%7Be.ctrlKey%26%262%3D%3De.location%26%26%28window.active%3D%21window.active%29%2Cn%28%29%7D%29%2C%210%29%2Cdocument.body.appendChild%28window.popup%29%2Cwindow.popup.focus%28%7BfocusVisible%3A%210%7D%29%3Bvar%20t%3Dthis%26%26this.__spreadArray%7C%7Cfunction%28e%2Cn%2Ct%29%7Bif%28t%7C%7C2%3D%3D%3Darguments.length%29for%28var%20o%2Ci%3D0%2Cp%3Dn.length%3Bi%3Cp%3Bi%2B%2B%29%21o%26%26i%20in%20n%7C%7C%28o%7C%7C%28o%3DArray.prototype.slice.call%28n%2C0%2Ci%29%29%2Co%5Bi%5D%3Dn%5Bi%5D%29%3Breturn%20e.concat%28o%7C%7CArray.prototype.slice.call%28n%29%29%7D%2Co%3D%28Math.pow%2CMath.abs%29%2Ci%3DMath.floor%2Cp%3DMath.ceil%2Cr%3DMath.max%2Ca%3D%28Math.min%2Cfunction%28e%2Cn%29%7Breturn%20i%28Math.random%28%29%2A%28i%28n%29-p%28e%29%29%2Bp%28e%29%29%7D%29%2Cu%3Dfunction%28e%29%7Breturn%201-o%28e-2%29%7D%2Cw%3Dfunction%28e%29%7Breturn%20Symbol.for%28JSON.stringify%28e%29%29%7D%2Cc%3D24%2Cl%3D24%2Cd%3D16%2Cs%3Dnew%20Array%28l%29.fill%28new%20Array%28c%29.fill%280%29%29%2Cf%3D%5B%7Bx%3Ai%286%29%2Cy%3Ai%2812%29%7D%5D%2Cy%3D1%2Cm%3D4%2Cx%3D%7Bx%3Aa%280%2Cc%29%2Cy%3Aa%280%2Cl%29%7D%2Ch%3D0%2Cv%3D%211%2CE%3D%210%2Cg%3Ddocument.createElement%28%22canvas%22%29%3Bg.width%3D384%2Cg.height%3D384%2Cwindow.popup.style.width%3D%60%24%7Bg.width%7Dpx%60%2Cwindow.popup.style.height%3D%60%24%7Bg.height%7Dpx%60%3Bvar%20b%3Ddocument.getElementById%28%22game%22%29%3Bnull%3D%3Db%7C%7Cb.appendChild%28g%29%3Bvar%20A%3Dg.getContext%28%222d%22%29%3Bwindow.addEventListener%28%22keydown%22%2C%28function%28e%29%7Bvar%20n%3Dfunction%28%29%7Bswitch%28e.key.toLowerCase%28%29%29%7Bcase%22arrowdown%22%3Areturn%20e.preventDefault%28%29%2CE%3Fy%3A2%3Bcase%22s%22%3Areturn%20E%3Fy%3A2%3Bcase%22arrowup%22%3Areturn%20e.preventDefault%28%29%2CE%3Fy%3A0%3Bcase%22w%22%3Areturn%20E%3Fy%3A0%3Bcase%22arrowleft%22%3Areturn%20e.preventDefault%28%29%2CE%3Fy%3A3%3Bcase%22a%22%3Areturn%20E%3Fy%3A3%3Bcase%22arrowright%22%3Areturn%20e.preventDefault%28%29%2CE%3Fy%3A1%3Bcase%22d%22%3Areturn%20E%3Fy%3A1%3Bcase%22enter%22%3Areturn%20M%28%29%2Cy%7D%7D%28%29%3B%28y%2B3%29%254%21%3Dn%26%26%28y%2B5%29%254%21%3Dn%7C%7C%28y%3Dn%29%7D%29%29%3Bvar%20L%3Dfunction%28%29%7Bs.fill%28new%20Array%28c%29.fill%280%29%29%2Cs%5Br%280%2Cx.y%29%5D%3Dt%28t%28t%28%5B%5D%2Cs%5Br%280%2Cx.y%29%5D.slice%280%2Cr%280%2Cx.x%29%29%2C%210%29%2C%5B2%5D%2C%211%29%2Cs%5Br%280%2Cx.y%29%5D.slice%28r%280%2Cx.x%29%2B1%2Cs%5Br%280%2Cx.y%29%5D.length%29%2C%210%29%2Cf.forEach%28%28function%28e%29%7Btry%7Bs%5Br%280%2Ce.y%29%5D%3Dt%28t%28t%28%5B%5D%2Cs%5Br%280%2Ce.y%29%5D.slice%280%2Cr%280%2Ce.x%29%29%2C%210%29%2C%5B1%5D%2C%211%29%2Cs%5Br%280%2Ce.y%29%5D.slice%28r%280%2Ce.x%29%2B1%2Cs%5Br%280%2Ce.y%29%5D.length%29%2C%210%29%7Dcatch%28e%29%7Bv%3D%210%7D%7D%29%29%2Cs.forEach%28%28function%28e%2Cn%29%7Be.forEach%28%28function%28e%2Ct%29%7BA%26%26%28A.fillStyle%3D%5B%22green%22%2C%22blue%22%2C%22red%22%5D%5Be%5D%2CA.fillRect%28t%2Ad%2Cn%2Ad%2Cd%2Cd%29%29%7D%29%29%7D%29%29%2CA%26%26%28A.fillStyle%3D%22white%22%2CA.font%3D%22bold%20%22.concat%2812%2C%22px%20sans-serif%22%29%2CA.fillText%28h.toString%28%29%2C16%2C32%29%29%7D%2CM%3Dfunction%28%29%7Bv%26%26%28f%3D%5B%7Bx%3Ai%286%29%2Cy%3Ai%2812%29%7D%5D%2Cy%3D1%2Cm%3D4%2Cx%3D%7Bx%3Aa%280%2Cc%29%2Cy%3Aa%280%2Cl%29%7D%2Ch%3D0%2Cv%3D%211%2CE%3D%211%2CrequestAnimationFrame%28k%29%29%7D%2Ck%3Dfunction%28%29%7Bvar%20e%2Cn%2Ct%3BE%7C%7C%28v%7C%7C%28f.unshift%28%7Bx%3Af%5B0%5D.x%2B%28t%3Dy%2C1-o%28t-1%29%29%2Cy%3Af%5B0%5D.y%2Bu%28y%29%7D%29%2C%28f%3Df.slice%280%2Cm%29%29%5B0%5D.x%3D%3Dx.x%26%26f%5B0%5D.y%3D%3Dx.y%26%26%28h%2B%3D1%2Cm%2B%3D1%2Cx%3D%7Bx%3Aa%280%2Cc%29%2Cy%3Aa%280%2Cl%29%7D%29%2C%28f%5B0%5D.x%3E%3Dc%7C%7Cf%5B0%5D.x%3C0%7C%7Cf%5B0%5D.y%3E%3Dl%7C%7Cf%5B0%5D.y%3C0%29%26%26%28v%3D%210%29%2Cn%3D%7B%7D%2C%28e%3Df%29.forEach%28%28function%28e%2Ct%29%7Bn.hasOwnProperty%28w%28e%29%29%7C%7C%28n%5Bw%28e%29%5D%3Dt%29%7D%29%29%2Ce.some%28%28function%28e%2Ct%29%7Breturn%20n%5Bw%28e%29%5D%21%3Dt%7D%29%29%26%26%28v%3D%210%29%29%2CL%28%29%2Cwindow.setTimeout%28requestAnimationFrame%2C62.5%2Ck%29%29%7D%3BrequestAnimationFrame%28L%29%2Cn%28%29%7Delse%20window.active%3D%21window.active%2Cn%28%29%7D%28%29%3B)
(supposed to be a link but github is not showing it on my computer)

# dev tools
[js minifier](https://www.digitalocean.com/community/tools/minify)

[url encoder](https://www.urlencoder.org)

[jshint](https://jshint.com/)
