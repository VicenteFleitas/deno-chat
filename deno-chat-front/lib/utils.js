export function randomFloat(min, max) {
  return min + Math.random() * (max - min);
}

export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function sorting(objectArray) {
  //check y position and sort
  objectArray.sort((a, b) => (a.y - b.y));
  let inx = 0;
  objectArray.forEach((child, index) => {
    if (index == 0) {
      inx = child.layer;
    }
    child.layer = inx + index;
  });
}

export const colors = [ 
	"#160b27", "#3e4768", "#8e98b9", "#dee6fe",
	"#f3c41c", "#f98617", "#d42c4f", "#5f0267",
	"#4a10e8", "#2197f0", "#52daf7", "#bb4d11",
	"#ed7fb8", "#30fca6", "#17ba7d", "#056244"
]

export const colorsDB = [
	"#140c1c", "#442434","#30346d","#4e4a4e",
	"#854c30","#346524","#d04648","#757161",
	"#597dce","#d27d2c","#8595a1","#6daa2c",
	"#d2aa99","#6dc2ca","#dad45e","#deeed6"
]

export function loadJson(source, loadHandler) {
  //Create a new `xhr` object to store the file
  let xhr = new XMLHttpRequest();
  xhr.open("GET", source, true);
  xhr.responseType = "text";

  xhr.onload = event => {
    // 200: means loaded success
    if (xhr.status === 200) {
      let file = JSON.parse(xhr.responseText);
      file.name = source;
      loadHandler(file);
    }
  };

  //Send the request to load the file
  xhr.send();
}