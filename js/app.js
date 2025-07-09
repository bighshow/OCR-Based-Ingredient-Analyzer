// Function to check if a word is related to harmful chemicals
function isHarmful(word) {
    const harmfulKeywords = [
        'parabens', 'phthalates', 'formaldehyde', 'triclosan', 'oxybenzone',
        'bha', 'bht', 'coal tar', 'dea', 'mea', 'hydroquinone',
        'methylisothiazolinone', 'sodium lauryl sulfate', 'retinyl palmitate',
        'petroleum', 'mineral oil', 'propylene glycol', 'sodium laureth sulfate',
        'toluene', 'synthetic fragrance', 'ethanolamines', 'benzophenone',
        'diethanolamine', 'triethanolamine', 'lead acetate', 'phenoxyethanol',
        'silicones', 'sulfates', 'butylated hydroxytoluene (BHT)',
        'butylated hydroxyanisole (BHA)', 'p-phenylenediamine', 'quaternium-15',
        'chlorphenesin', 'methylparaben', 'ethylparaben', 'propylparaben',
        'butylparaben', 'isobutylparaben', 'isopropylparaben',
        'dioxane', 'talc', 'polyethylene glycol (PEG)',
        'methoxycinnamate', 'octinoxate', 'octocrylene', 'dibutyl phthalate (DBP)',
        'sodium tallowate', 'quats (quaternary ammonium compounds)',
        'ethylenediaminetetraacetic acid (EDTA)', 'paraffin wax', 'ethoxylated surfactants',
        'microbeads', 'nanoparticles', 'artificial dyes', 'benzyl benzoate',
        'resorcinol', 'carbon black', 'trisiloxane', 'dimethicone copolyol'
    ];
    return harmfulKeywords.some(keyword => word.toLowerCase().includes(keyword));
}

// Function to check if a word is related to Ayurvedic ingredients
function isAyurvedic(word) {
    const ayurvedicIngredients = [
        { common: 'ashwagandha', scientific: 'Withania somnifera' },
        { common: 'turmeric', scientific: 'Curcuma longa' },
        { common: 'ginger', scientific: 'Zingiber officinale' },
        { common: 'neem', scientific: 'Azadirachta indica' },
        { common: 'triphala', scientific: 'Combination of three fruits' },
        { common: 'amla', scientific: 'Phyllanthus emblica' },
        { common: 'tulsi', scientific: 'Ocimum sanctum' },
        { common: 'brahmi', scientific: 'Bacopa monnieri' },
        { common: 'shatavari', scientific: 'Asparagus racemosus' },
        { common: 'guduchi', scientific: 'Tinospora cordifolia' },
        { common: 'licorice', scientific: 'Glycyrrhiza glabra' },
        { common: 'cardamom', scientific: 'Elettaria cardamomum' },
        { common: 'cinnamon', scientific: 'Cinnamomum verum' },
        { common: 'cumin', scientific: 'Cuminum cyminum' },
        { common: 'fenugreek', scientific: 'Trigonella foenum-graecum' },
        { common: 'boswellia', scientific: 'Boswellia serrata' },
        { common: 'guggul', scientific: 'Commiphora wightii' },
        { common: 'haritaki', scientific: 'Terminalia chebula' },
        { common: 'bibhitaki', scientific: 'Terminalia bellirica' },
        { common: 'jatamansi', scientific: 'Nardostachys jatamansi' },
        { common: 'manjistha', scientific: 'Rubia cordifolia' },
        { common: 'mustard', scientific: 'Brassica juncea' },
        { common: 'pippali', scientific: 'Piper longum' },
        { common: 'shankhpushpi', scientific: 'Convolvulus pluricaulis' },
        { common: 'shilajit', scientific: 'Asphaltum' },
        { common: 'vidari', scientific: 'Pueraria tuberosa' },
        { common: 'aloe vera', scientific: 'Aloe barbadensis miller' },
        { common: 'bhringraj', scientific: 'Eclipta alba' }
    ];
    return ayurvedicIngredients.find(ingredient => 
        word.toLowerCase().includes(ingredient.common) || 
        word.toLowerCase().includes(ingredient.scientific)
    );
}

// Function to check if a word is related to beneficial chemicals
function isBeneficial(word) {
    const beneficialChemicals = [
        { commercial: 'hyaluronic acid', chemical: 'sodium hyaluronate' },
        { commercial: 'vitamin C', chemical: 'ascorbic acid' },
        { commercial: 'vitamin E', chemical: 'tocopherol' },
        { commercial: 'niacinamide', chemical: 'nicotinamide' },
        { commercial: 'glycerin', chemical: 'glycerol' },
        { commercial: 'ceramides', chemical: 'N-stearoyl sphinganine' },
        { commercial: 'salicylic acid', chemical: '2-hydroxybenzoic acid' },
        { commercial: 'alpha-hydroxy acids', chemical: 'glycolic acid' },
        { commercial: 'retinol', chemical: 'vitamin A1' },
        { commercial: 'peptides', chemical: 'amino acid chains' },
        { commercial: 'coenzyme Q10', chemical: 'ubiquinone' },
        { commercial: 'squalane', chemical: '2,6,10,15,19,23-hexamethyltetracosane' },
        { commercial: 'allantoin', chemical: '5-ureidohydantoin' },
        { commercial: 'panthenol', chemical: 'provitamin B5' },
        { commercial: 'resveratrol', chemical: '3,5,4′-trihydroxy-trans-stilbene' }
    ];
    return beneficialChemicals.find(chemical => 
        word.toLowerCase().includes(chemical.commercial) || 
        word.toLowerCase().includes(chemical.chemical)
    );
}

// Function to analyze the image
async function analyzeImage(imageData) {
    try {
        console.log('Starting image analysis...');
        const { data: { text } } = await Tesseract.recognize(imageData, 'eng', {
            logger: m => console.log(m)
        });
        console.log('Recognized text:', text);
        const words = text.split(/\s+/);
        const harmfulWords = words.filter(isHarmful);
        const ayurvedicIngredients = words.map(isAyurvedic).filter(Boolean);
        const beneficialChemicals = words.map(isBeneficial).filter(Boolean);
        
        let result = { category: 'Ingredients Analysis', harmful: [], ayurvedic: [], beneficial: [] };
        
        if (harmfulWords.length > 0) {
            result.harmful = harmfulWords;
        }
        if (ayurvedicIngredients.length > 0) {
            result.ayurvedic = ayurvedicIngredients;
        }
        if (beneficialChemicals.length > 0) {
            result.beneficial = beneficialChemicals;
        }
        
        return result;
    } catch (error) {
        console.error('Error in analyzeImage:', error);
        throw new Error(`Image analysis failed: ${error.message}`);
    }
}

// Function to display results
function displayResults(result) {
    resultDiv.innerHTML = `<h3>${result.category}</h3>`;
    if (result.harmful.length > 0) {
        resultDiv.innerHTML += `<h4>Harmful Ingredients:</h4><p>${result.harmful.join(', ')}</p>`;
    }
    if (result.ayurvedic.length > 0) {
        resultDiv.innerHTML += `<h4>Ayurvedic Ingredients:</h4>`;
        result.ayurvedic.forEach(ingredient => {
            resultDiv.innerHTML += `<p>${ingredient.common} (${ingredient.scientific})</p>`;
        });
    }
    if (result.beneficial.length > 0) {
        resultDiv.innerHTML += `<h4>Beneficial Chemicals:</h4>`;
        result.beneficial.forEach(chemical => {
            resultDiv.innerHTML += `<p>${chemical.commercial} (${chemical.chemical})</p>`;
        });
    }
    if (result.harmful.length === 0 && result.ayurvedic.length === 0 && result.beneficial.length === 0) {
        resultDiv.innerHTML += `<p>No specific ingredients detected</p>`;
    }
}

// DOM Elements
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const captureButton = document.getElementById('captureButton');
const resultDiv = document.getElementById('result');
const fileInput = document.getElementById('imageUpload');
const fileNameSpan = document.getElementById('fileName');
const analyzeUploadButton = document.getElementById('analyzeUploadButton');
const consentButton = document.getElementById('consentButton');
const stopCameraButton = document.getElementById('stopCameraButton');

let stream = null;

// Function to request webcam access
async function requestWebcamAccess() {
    try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        captureButton.disabled = false;
        stopCameraButton.disabled = false;
        consentButton.disabled = true;
    } catch (err) {
        console.error("Error accessing the webcam", err);
        resultDiv.textContent = "Error accessing the webcam. Please make sure you have given permission and your camera is connected.";
    }
}

// Function to stop webcam access
function stopWebcam() {
    if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        video.srcObject = null;
        stream = null;
        captureButton.disabled = true;
        stopCameraButton.disabled = true;
        consentButton.disabled = false;
    }
}

// Event listener for consent button
consentButton.addEventListener('click', () => {
    const consent = confirm("This application requires access to your camera for ingredient analysis. Do you consent to camera access? Your privacy is important to us, and the camera will only be activated when you choose to capture an image.");
    if (consent) {
        requestWebcamAccess();
    }
});

// Event listener for stop camera button
stopCameraButton.addEventListener('click', stopWebcam);

// Capture and analyze from webcam
captureButton.addEventListener('click', async () => {
    if (!stream) {
        alert("Please enable camera access first.");
        return;
    }
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL('image/png');
    
    resultDiv.textContent = 'Analyzing...';
    
    try {
        const result = await analyzeImage(imageData);
        displayResults(result);
    } catch (error) {
        resultDiv.textContent = 'Error analyzing image. Please try again.';
        console.error(error);
    }
});

// File upload handling
fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        fileNameSpan.textContent = file.name;
        analyzeUploadButton.disabled = false;
    } else {
        fileNameSpan.textContent = 'No file chosen';
        analyzeUploadButton.disabled = true;
    }
});

// Analyze uploaded image
analyzeUploadButton.addEventListener('click', async () => {
    const file = fileInput.files[0];
    if (!file) {
        resultDiv.textContent = 'Please select an image file first.';
        return;
    }

    resultDiv.textContent = 'Analyzing...';

    try {
        const imageData = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.readAsDataURL(file);
        });

        const result = await analyzeImage(imageData);
        displayResults(result);
    } catch (error) {
        console.error('Detailed error:', error);
        resultDiv.textContent = `Error analyzing image: ${error.message}. Please try again.`;
    }
});

// Ensure the page is served over HTTPS
if (window.location.protocol !== 'https:') {
    alert('This application should be accessed over HTTPS for security reasons. Please use an HTTPS connection.');
}

// Initially disable capture and stop buttons
captureButton.disabled = true;
stopCameraButton.disabled = true;