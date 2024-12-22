
document.getElementById('shorten-btn').addEventListener('click', async function () {
    const longUrl = document.getElementById('long-url').value;
    const customKey = document.getElementById('custom-key').value || null;

    try {
        const response = await fetch('http://localhost:3000/shorten', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ longUrl, customKey }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            alert(errorData.error);
            return;
        }

        const data = await response.json();
        displayShortUrl(data.shortUrl);
    } catch (error) {
        console.error('Error:', error);
    }
});

function displayShortUrl(shortUrl) {
    document.getElementById('short-url-display').innerText = `Short URL: ${shortUrl}`;
    document.getElementById('copy-btn').style.display = 'inline-block'; // Show copy button
    document.getElementById('copy-btn').onclick = function () {
        copyToClipboard(shortUrl);
    };
}

function copyToClipboard(shortUrl) {
    navigator.clipboard.writeText(shortUrl).then(() => {
        alert('Short URL copied to clipboard!');
    });
}


document.getElementById('toggle-theme').addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
});


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('scene-container').appendChild(renderer.domElement);


const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);


camera.position.z = 5;


function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();