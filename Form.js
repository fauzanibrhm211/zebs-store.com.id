document.addEventListener('DOMContentLoaded', () => {
    const selectedGame = localStorage.getItem('selectedGame') || "Game";
    document.getElementById('game-title').innerText = "Top Up " + selectedGame;

    const inputContainer = document.getElementById('input-container');
    const idHelper = document.getElementById('id-helper');

    // 1. SETTING INPUT PER GAME
    if (selectedGame.includes("Mobile Legend")) {
        inputContainer.innerHTML = `
            <input type="number" id="player-id" placeholder="User ID" style="flex: 2; padding: 12px; border-radius: 10px; border: 1px solid #333; background: #222; color: white;" required>
            <input type="number" id="zone-id" placeholder="(Server)" style="flex: 1; padding: 12px; border-radius: 10px; border: 1px solid #333; background: #222; color: white;" required>
        `;
        idHelper.innerText = "*Masukkan User ID dan Zone ID MLBB.";
    } else {
        inputContainer.innerHTML = `
            <input type="number" id="player-id" placeholder="Masukkan ID / UID Akun" style="width: 100%; padding: 12px; border-radius: 10px; border: 1px solid #333; background: #222; color: white;" required>
        `;
        idHelper.innerText = "*Pastikan ID akun sudah benar.";
    }

    // 2. GENERATE 20 DAFTAR NOMINAL
    let nominalData = [];
    for(let i=1; i<=20; i++) {
        let qty = i * 50;
        let prc = i * 7500;
        if(selectedGame.includes("ML")) { qty = i * 15; prc = i * 4000; }
        nominalData.push({ name: `${qty} Diamonds/Item`, price: `Rp ${prc.toLocaleString('id-ID')}` });
    }

    const gridNominal = document.getElementById('nominal-list');
    nominalData.forEach(item => {
        const card = document.createElement('div');
        card.className = 'item-nominal';
        card.innerHTML = `<strong>${item.name}</strong><span>${item.price}</span>`;
        card.onclick = () => {
            document.querySelectorAll('.item-nominal').forEach(el => el.classList.remove('active'));
            card.classList.add('active');
            localStorage.setItem('selectedItem', item.name);
            localStorage.setItem('selectedPrice', item.price);
        };
        gridNominal.appendChild(card);
    });

    // 3. LOGIKA PILIH PEMBAYARAN
    document.querySelectorAll('.item-payment').forEach(pay => {
        pay.onclick = () => {
            document.querySelectorAll('.item-payment').forEach(el => el.classList.remove('active'));
            pay.classList.add('active');
            localStorage.setItem('selectedPayment', pay.getAttribute('data-pay'));
        };
    });
});

// 4. FUNGSI PROSES KE WHATSAPP (NOMOR: 08984830064)
function prosesBayar() {
    const id = document.getElementById('player-id').value;
    const zone = document.getElementById('zone-id') ? document.getElementById('zone-id').value : "";
    const game = localStorage.getItem('selectedGame');
    const item = localStorage.getItem('selectedItem');
    const price = localStorage.getItem('selectedPrice');
    const pay = localStorage.getItem('selectedPayment');

    if (!id || !item || !pay) {
        alert("Waduh! Isi ID, Pilih Nominal, dan Metode Bayar dulu ya.");
        return;
    }

    const idLengkap = zone ? `${id} (${zone})` : id;
    const nomorWA = "628984830064"; 

    const pesan = `*ORDER BARU - ZEBS STORE*%0A` +
                  `------------------------------%0A` +
                  `🎮 *Game* : ${game}%0A` +
                  `🆔 *ID Akun* : ${idLengkap}%0A` +
                  `💎 *Pesanan* : ${item}%0A` +
                  `💰 *Harga* : ${price}%0A` +
                  `💳 *Metode* : ${pay}%0A` +
                  `------------------------------%0A` +
                  `_Tolong segera diproses ya Bang Zebs!_`;

    const linkWA = `https://api.whatsapp.com/send?phone=${nomorWA}&text=${pesan}`;
    window.open(linkWA, '_blank');
}
