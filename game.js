const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const categories = {
    'Won an Assist title': ['Chris Paul', 'Rondo', 'Westbrook', 'Harden'],
    'Was Undrafted': ['Fred VanVleet', 'Austin Reeves', 'Alex Caruso', 'T.J. McConnell'],
    'Was a DPOY': ['Marcus Smart', 'Dwight Howard', 'Draymond Green', 'Ben Wallace'],
    'Went to Kansas': ['Embiid', 'Wilt', 'Andrew Wiggins', 'Christian Braun']
};

let remainingNames = [];
let clickedNames = [];
let lives = 4;

function initializeGame() {
    remainingNames = shuffle([].concat(...Object.values(categories)));
    displayGame();
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function drawHeart(x, y, size) {
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.moveTo(x, y + size / 4);
    ctx.quadraticCurveTo(x, y, x + size / 2, y);
    ctx.quadraticCurveTo(x + size, y, x + size, y + size / 4);
    ctx.lineTo(x + size, y + size / 2);
    ctx.lineTo(x + size / 2, y + size);
    ctx.lineTo(x, y + size / 2);
    ctx.closePath();
    ctx.fill();
}

function displayGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Display names
    for (let i = 0; i < remainingNames.length; i++) {
        const row = Math.floor(i / 4);
        const col = i % 4;
        const x = col * 75;
        const y = row * 125;

        ctx.fillStyle = clickedNames.includes(remainingNames[i]) ? 'gray' : 'black';
        ctx.fillRect(x, y, 75, 125);
        ctx.fillStyle = 'white';
        ctx.font = '7px Arial'; // Adjusted font size to fit names
        ctx.fillText(remainingNames[i], x + 10, y + 50);
    }

    // Display remaining lives (hearts) above the game
    for (let i = 0; i < lives; i++) {
        const heartSize = 30;
        const heartPadding = 5;
        const heartX = i * (heartSize + heartPadding) + heartPadding;
        const heartY = 5;

        drawHeart(heartX, heartY, heartSize);
    }
}

function checkCategory() {
    const clickedCategory = new Set();

    clickedNames.forEach(name => {
        for (const [category, names] of Object.entries(categories)) {
            if (names.includes(name)) {
                clickedCategory.add(category);
            }
        }
    });

    if (clickedCategory.size === 1 && clickedNames.length === 4) {
        // Remove the clicked names from the remaining names
        remainingNames = remainingNames.filter(name => !clickedNames.includes(name));
        clickedNames = [];
        displayGame(); // Redraw to update box colors

        if (remainingNames.length === 0) {
            // alert('Congratulations! You cleared all names.');
            alert('Congratulations! You cleared all names.' +
            '\n\nWon an Assist title: Chris Paul, Rondo, Westbrook, Harden,' +
            '\nWas Undrafted: Fred VanVleet, Austin Reeves, Alex Caruso, TJ McConnell,' +
            '\nWas a DPOY: Marcus Smart, Dwight Howard, Draymond Green, Ben Wallace,' +
            '\nWent to Kansas: Embiid, Wilt, Andrew Wiggins, Christian Braun');

            

            // Optionally, you can choose to end the game or reset here based on your needs.
        }

    }
    
        

    else {
        lives--;

        if (lives === 0) {
            alert('Game over! You ran out of lives.');
            // Optionally, you can choose to end the game or reset here based on your needs.
        } else {

            // if (clickedCategory.size === 2 && clickedNames.length === 4) {
            //     alert('Your guess contained words from 2 categories');

            // }

            // if (clickedCategory.size === 3 && clickedNames.length === 4) {
            //     alert('Your guess contained words from 3 categories');

            // }

            // if (clickedCategory.size === 4 && clickedNames.length === 4) {
            //     alert('Your guess contained words from all 4 categories');

            // }

            alert(`Wrong category! Lives remaining: ${lives}`);
            displayGame(); // Redraw to update remaining lives
        }
    };

}

canvas.addEventListener('click', function (event) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const clickedIndex = Math.floor(mouseY / 125) * 4 + Math.floor(mouseX / 75);
    const clickedName = remainingNames[clickedIndex];

    if (clickedName) {
        // Toggle the clicked name in the array
        if (!clickedNames.includes(clickedName)) {
            clickedNames.push(clickedName);
        } else {
            clickedNames = clickedNames.filter(name => name !== clickedName);
        }

        displayGame(); // Redraw to update box colors
    }
});

// Initialize the game
initializeGame();
