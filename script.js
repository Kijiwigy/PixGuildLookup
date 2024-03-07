document.addEventListener("DOMContentLoaded", function () {
    // Variável de controle para inverter entre duas ordens
    let reverseOrder = false;

    // Conjunto para armazenar lands visitadas
    let visitedLands = new Set();

    // Array para armazenar lands na blacklist
    let blacklistedLands = [
        [94, 98, 118, 131, 142, 141, 148, 211, 239, 238, 266, 267, 262, 260, 268, 279, 274, 288, 286, 297, 327, 329, 351,
            352, 359, 263, 375, 384, 425, 429, 443, 447, 4999, 4994, 4989, 774, 775, 772, 771, 836, 4744, 4338, 762],

        [698, 881, 4340, 3454, 4619, 2049, 897, 4360, 4611, 578, 2186, 4676, 2060, 2062, 2188, 4321, 4612, 2063, 4780, 4292,
            4627, 4782, 4740, 4781, 4624, 4631, 2082, 779, 4683, 2083, 2102, 4455, 4427, 4373, 784, 4370, 4793, 4686, 4738,
            4457, 4372, 4703, 4431, 4753, 4652, 4383, 2110, 4714, 2112, 2212, 2233, 4382, 4758, 4766, 4381, 913, 4705, 4387],

        [4253, 2254, 2125, 2256, 2120, 547, 921, 4815, 4814, 4812, 4813, 2267, 2276, 4832, 4668, 643, 794, 2281, 4445,
            2145, 2283, 4411, 4726, 4728, 2296, 689, 2292, 800, 2297, 692, 2300, 437, 4277, 4833, 2172, 4844, 585, 4469,
            2315, 4855, 2313, 4853, 2324, 4857, 4933, 4210, 4124, 4547, 4934, 2338, 4492, 4546, 4311],

        [4564, 2360, 4264, 4948, 4483, 4906, 2368, 4875, 2375, 2390, 2369, 757, 2454, 520, 2372, 4865, 4914, 4288, 4269, 4892,
            2398, 2379, 4958, 3920, 3585, 4609, 793, 623, 2652, 2625, 2803, 2562, 4805, 2565, 298, 4393, 4389, 4805, 4755],

        [4939, 2341, 2348, 4943, 4209, 4941, 2628, 4270, 4108, 4109, 2809, 4395, 4959, 4361, 2635, 1314, 1350, 4872, 1283,
            1601, 1798, 4878, 1593, 4164, 4261, 363, 1766, 1891, 1607, 4556, 1896, 4555, 4579, 1176, 1317, 1328, 4895, 1637,
	2985, 3792, 2463, 3739],

        [4260, 1641, 4913, 4497, 1189, 4979, 1839, 1041, 4502, 4559, 1837, 4982, 1169, 1906, 154, 4525, 4765, 4218, 1909, 4768,
	1813, 1053, 1604, 1560, 4359, 4145, 4033, 2286, 2461, 3816, 3973, 3955, 569, 3698, 3683, 2507, 3591, 3905, 3974, 3960,
	1203, 1916, 1572, 552, 2610, 2790],

	[2476, 2541, 3027, 3928, 3929, 842, 2479, 2968, 2550, 3867, 3071, 2998, 3607, 2446, 4593, 3741, 3048, 4601, 2971, 863, 2672,
	3869, 2965, 1477, 3687, 554, 2506, 3870, 3763, 4575, 529, 4054, 3626, 3727, 3010, 566, 2616, 3597, 1092, 3605, 2242, 
	1974, 1207, 4010, 3769, 3944, 2989, 3770, 2228, 2445, 656, 2575, 1688, 681, 3364, 99, 3511, 752, 3246, 2106, 1468, 4837,
	2799, 931, 3051, 4011, 4596, 3036, 3627, 1478, 3946, 3525, 1949, 3776, 3427, 3224, 3967, 1486, 4602, 751, 452, 2767, 1095, 
	712, 2879, 481, 3628, 3965, ] 
        // ... Adicione mais listas conforme necessário
    ];

    // Mantenha um mapeamento entre o número da land e seu estado (blacklisted ou não)
    let landStates = {};

    // Preencher a lista de lands
    populatePixelList();

    function populatePixelList() {
        const pixelList = document.getElementById("pixelList");

        for (let i = 1; i <= 5000; i++) {
            const listItem = document.createElement("li");
            const link = document.createElement("a");
            link.href = `https://play.pixels.xyz/pixels/share/${i}`;
            link.textContent = `Land ${i}`;
            listItem.appendChild(link);

            // Salvar o estado da land
            landStates[i] = isLandBlacklisted(i);

            // Adicionar cadeado para lands blacklistadas
if (landStates[i]) {
    const lockIcon = document.createElement("span");
    lockIcon.textContent = "🔒"; // Pode ser substituído por uma imagem de cadeado
    lockIcon.style.marginLeft = "5px";
    listItem.appendChild(lockIcon);
    listItem.classList.add("blacklisted");

	// Adicionar a classe 'no-blur' ao cadeado específico
	lockIcon.classList.add("no-blur");

	// Adicionar a dica de ferramenta
	const tooltip = document.createElement("div");
	tooltip.classList.add("tooltip");
	tooltip.textContent = "If it is locked, that means the land owner locked their precious resources to be got, don't worry, this land will be ignored";
	tooltip.style.position = "absolute";
	tooltip.style.top = "20px"; // Ajuste conforme necessário para posicionar a dica de ferramenta
	tooltip.style.left = "0";
	tooltip.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
	tooltip.style.color = "#fff";
	tooltip.style.padding = "5px";
	tooltip.style.borderRadius = "5px";
	tooltip.style.display = "none";  // Inicialmente, ocultamos a dica de ferramenta
	listItem.appendChild(tooltip);

	// Exibir a dica de ferramenta quando o mouse estiver sobre o cadeado
	lockIcon.addEventListener("mouseenter", function (event) {
 	   const lockIconRect = lockIcon.getBoundingClientRect();
 	   tooltip.style.display = "block";
 	   tooltip.style.top = `${lockIconRect.top - tooltip.offsetHeight}px`;
 	   tooltip.style.left = `${lockIconRect.left + lockIconRect.width}px`;
	});

	// Ocultar a dica de ferramenta quando o mouse sair do cadeado
	lockIcon.addEventListener("mouseleave", function () {
 	   tooltip.style.display = "none";
	});
	}

            // Adicionar evento de clique para abrir o link
            link.addEventListener("click", function (event) {
                openLinkInNewTab(link);
                event.preventDefault();
            });

            // Adicionar evento para clique do botão do meio
            link.addEventListener("mousedown", function (event) {
                if (event.button === 1) { // Verificar se o botão pressionado é o do meio
                    openLinkInNewTab(link);
                    event.preventDefault();
                }
            });

            pixelList.appendChild(listItem);
        }
    }

	function scrollToBottom() {
 	   const pixelList = document.getElementById("pixelList");
 	   pixelList.scrollTop = pixelList.scrollHeight;
}

	function openLinkInNewTab(link) {
 	   visitedLands.add(link.href);

  	  // Adiciona a classe "opened" ao link e sua li pai
 	   link.classList.add("opened");
 	   const listItem = link.parentElement;
 	   listItem.classList.add("opened");

 	   window.open(link.href, "_blank");
    
 	   // Role para o final após abrir o link
 	   scrollToBottom();
}

    function shuffleList() {
        const pixelList = document.getElementById("pixelList");
        const listItems = Array.from(pixelList.children);
        listItems.forEach(item => pixelList.removeChild(item));

        const shuffledLinks = listItems.map(item => item.querySelector("a"))
            .sort(() => Math.random() - 0.5);

        shuffledLinks.forEach(link => {
            const listItem = document.createElement("li");
            listItem.appendChild(link);
            pixelList.appendChild(listItem);
        });

        // Reaplicar estados das lands
        updateLandStates();
    }

    function reverseList() {
        const pixelList = document.getElementById("pixelList");
        const listItems = Array.from(pixelList.children);
        listItems.forEach(item => pixelList.removeChild(item));

        const sortedLinks = listItems.map(item => item.querySelector("a"))
            .sort((a, b) => {
                const numA = getLandNumber(a.href);
                const numB = getLandNumber(b.href);
                return reverseOrder ? numB - numA : numA - numB;
            });

        sortedLinks.forEach(link => {
            const listItem = document.createElement("li");
            listItem.appendChild(link);
            pixelList.appendChild(listItem);
        });

        // Reaplicar estados das lands
        updateLandStates();
    }

    function applyLandStates() {
        const pixelList = document.getElementById("pixelList");
        const listItems = Array.from(pixelList.children);

        listItems.forEach(item => {
            const link = item.querySelector("a");
            const landNumber = getLandNumber(link.href);

            // Adicionar cadeado para lands blacklistadas
            if (landStates[landNumber]) {
                const lockIcon = document.createElement("span");
                lockIcon.textContent = "🔒"; // Pode ser substituído por uma imagem de cadeado
                lockIcon.style.marginLeft = "5px";
                item.appendChild(lockIcon);
                item.classList.add("blacklisted");

                // Adicionar a classe 'no-blur' ao cadeado específico
                lockIcon.classList.add("no-blur");
            }
        });
    }

    function isLandBlacklisted(landNumber) {
        for (let i = 0; i < blacklistedLands.length; i++) {
            for (let j = 0; j < blacklistedLands[i].length; j++) {
                if (blacklistedLands[i][j] === landNumber) {
                    return true;
                }
            }
        }
        return false;
    }

    function openLands(numberOfLands) {
        const pixelList = document.getElementById("pixelList");
        const listItems = Array.from(pixelList.children);

        const unopenedLinks = listItems.map(item => item.querySelector("a"))
            .filter(link => !visitedLands.has(link.href) && !isLandBlacklisted(getLandNumber(link.href)));

        if (unopenedLinks.length >= numberOfLands) {
            const landsToOpen = reverseOrder
                ? unopenedLinks.slice(0, numberOfLands).reverse()
                : unopenedLinks.slice(0, numberOfLands);

            landsToOpen.forEach(link => {
                openLinkInNewTab(link);
            });
        } else {
            alert("Não há links suficientes para abrir.");
        }
    }

    function updateLandStates() {
        for (let i = 1; i <= 5000; i++) {
            landStates[i] = isLandBlacklisted(i);
        }
        applyLandStates();
    }

    // Associar funções aos botões
    document.getElementById("open5Btn").addEventListener("click", () => openLands(5));
    document.getElementById("open6Btn").addEventListener("click", () => openLands(6));
    document.getElementById("open7Btn").addEventListener("click", () => openLands(7));
    document.getElementById("shuffleBtn").addEventListener("click", shuffleList);
    document.getElementById("reverseBtn").addEventListener("click", reverseList);

    // Adicionar botão para forçar o reset
    const resetBtn = document.getElementById("resetBtn");
    resetBtn.addEventListener("click", function () {
        const pixelList = document.getElementById("pixelList");
        const listItems = Array.from(pixelList.children);

        listItems.forEach(item => {
            const link = item.querySelector("a");
            link.classList.remove("opened"); // Remove a classe "opened" ao resetar
        });

        reverseOrder = false;
        visitedLands = new Set();
        updateLandStates(); // Atualize os estados após o reset
    });

    function openLinkInNewTab(link) {
        visitedLands.add(link.href);

        // Adiciona a classe "opened" ao link e sua li pai
        link.classList.add("opened");
        const listItem = link.parentElement;
        listItem.classList.add("opened");

        window.open(link.href, "_blank");
    }

    // Função para obter o número da land a partir da URL
    function getLandNumber(url) {
        return parseInt(url.split("/").pop());
    }
});
