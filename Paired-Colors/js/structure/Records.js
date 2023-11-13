export default function Records(container, btnContainer, newElem) {
  const button = newElem('button', 'records-btn');
  const content = newElem('div', 'records');
  const list = newElem('ul', 'list');

  btnContainer.append(button);
  container.append(content);
  content.append(list);

  const classNameActive = content.className + '--active';
  button.addEventListener('click', () =>
    content.classList.toggle(classNameActive)
  );
  button.innerHTML = recordsSVG;

  //test for css
  addRecord('192.168.0.1', 120, 15);
  addRecord('192.168.0.2', 55, 15);
  //

  Object.defineProperties(this, {
    button: { get: () => button },
    content: { get: () => content },
    list: { get: () => list },
    addRecord: { get: () => addRecord },
    removeRecord: { get: () => removeRecord },
  });

  function addRecord(name, time, clicks) {
    const newRecord = newElem('li', 'rec');
    newRecord.innerText = `${name} ${time} ${clicks}`;
    list.append(newRecord);
  }

  function removeRecord(record) {
    list.removeChild(record);
  }
}

const recordsSVG = `<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 viewBox="0 0 1280.000000 720.000000"
preserveAspectRatio="xMidYMid meet">
<metadata>
Created by potrace 1.15, written by Peter Selinger 2001-2017
</metadata>
<g transform="translate(0.000000,720.000000) scale(0.100000,-0.100000)"
fill="currentColor" stroke-width="1" stroke="black">
<path d="M4200 6480 l0 -140 -217 -1 c-247 0 -276 -6 -308 -59 -17 -30 -20
-56 -24 -195 -4 -171 13 -582 30 -730 42 -375 134 -661 287 -895 20 -30 39
-57 42 -60 3 -3 21 -25 40 -50 113 -145 317 -308 508 -404 78 -39 251 -111
294 -121 16 -4 51 -34 84 -73 242 -280 512 -476 804 -585 53 -20 126 -43 163
-53 59 -14 67 -19 67 -40 0 -14 4 -32 9 -42 15 -27 31 -251 31 -417 0 -157
-16 -386 -30 -420 -4 -11 -13 -58 -20 -105 -7 -47 -16 -89 -20 -95 -4 -5 -12
-37 -19 -70 -7 -33 -16 -69 -21 -80 -4 -11 -21 -56 -36 -100 -16 -44 -34 -91
-41 -105 -7 -14 -13 -28 -13 -32 0 -30 -152 -315 -202 -379 -15 -20 -28 -40
-28 -44 0 -4 -11 -21 -25 -39 -14 -17 -29 -36 -33 -41 -5 -6 -13 -18 -18 -26
-23 -41 -304 -339 -319 -339 -3 0 -67 -54 -97 -82 -10 -10 -21 -18 -25 -18 -3
0 -13 -7 -22 -15 -21 -20 -132 -91 -196 -126 l-50 -27 -3 -76 -3 -76 1501 0
1500 0 0 74 0 74 -79 46 c-44 25 -83 50 -86 56 -4 6 -23 19 -43 29 -20 11 -51
32 -69 48 -17 15 -46 39 -65 53 -43 32 -307 296 -333 333 -25 35 -79 110 -117
159 -15 20 -28 39 -28 42 0 3 -17 32 -39 65 -71 111 -188 363 -221 476 -5 17
-15 48 -24 70 -8 22 -15 49 -16 60 0 12 -4 25 -8 30 -5 6 -14 42 -21 80 -7 39
-16 79 -21 90 -11 28 -30 180 -30 242 0 29 -4 55 -10 58 -6 4 -10 83 -10 205
0 122 4 201 10 205 6 3 10 34 11 68 0 34 6 96 12 137 12 73 12 74 47 83 191
49 404 144 565 252 55 37 102 70 105 74 3 3 23 19 45 35 44 33 264 250 310
308 23 28 51 44 120 71 195 75 395 191 525 304 89 78 177 170 220 233 13 19
27 37 30 40 4 3 28 41 55 85 178 294 276 654 315 1155 17 228 30 461 30 553 0
85 -1 90 -30 119 l-31 30 -257 -3 -257 -4 -3 133 -3 132 -2094 0 -2095 0 0
-140z m4566 -387 c-3 -38 -8 -126 -11 -198 -10 -224 -34 -450 -67 -630 -93
-505 -288 -837 -623 -1062 -87 -58 -128 -83 -139 -83 -2 0 16 37 41 83 110
198 215 454 281 692 22 77 43 154 46 170 3 17 11 53 16 80 52 241 80 523 80
802 l0 202 78 4 c42 1 128 4 191 5 l114 2 -7 -67z m-4562 -210 c8 -300 25
-460 72 -698 65 -328 159 -606 304 -896 29 -57 61 -116 72 -132 11 -15 18 -32
16 -37 -3 -10 -205 105 -228 130 -3 3 -25 21 -50 40 -75 58 -189 180 -246 266
-143 214 -220 451 -264 814 -11 94 -30 509 -30 663 l0 97 173 0 174 0 7 -247z"/>
</g>
</svg>`;
