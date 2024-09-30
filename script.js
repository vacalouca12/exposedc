document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Evita o comportamento padrão de recarregar a página ao submeter o formulário

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const correctUsername = "admin"; // Nome de usuário correto
    const correctPassword = "senha123"; // Senha correta

    // Verifica se o login está correto
    if (username === correctUsername && password === correctPassword) {
        // Redireciona para a página principal (main.html)
        window.location.href = "main.html";
    } else {
        // Exibe uma mensagem de erro
        document.getElementById('error').textContent = "Nome de usuário ou senha incorretos.";
        
        // Se o login falhar, envia um aviso para a webhook do Discord
        const ip = "IP do usuário aqui"; // Você precisaria usar um serviço externo para capturar o IP real
        enviarWebhook(username, ip);
    }
});

function enviarWebhook(username, ip) {
    const webhookUrl = "https://discord.com/api/webhooks/xxxxxxxxxx/xxxxxxxxxxxx"; // Substitua com sua URL de webhook do Discord
    const data = {
        username: "Exposed Site Bot",
        content: `Tentativa de login falhada.\nNome de usuário: ${username}\nIP: ${ip}`
    };

    fetch(webhookUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(response => {
        console.log("Notificação enviada ao Discord");
    }).catch(error => {
        console.error("Erro ao enviar webhook", error);
    });
}
