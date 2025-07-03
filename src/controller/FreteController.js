import axios from "axios";

// Calculo para calcular o frete
async function calcularFrete(req, res) {
    // Busca informações do Cep 1
    const via1 = await fetch(`https://viacep.com.br/ws/${req.params.cep1}/json/`);
    const remetente = await via1.json();
    
    // Busca informações do Cep 2
    const via2 = await fetch(`https://viacep.com.br/ws/${req.params.cep2}/json/`);
    const destinatario = await via2.json();

    // Guarda as principais informações em uma string
    const endereco1 = `${remetente.logradouro}, ${remetente.bairro}, ${remetente.localidade}, Brasil`;
    const endereco2 = `${destinatario.logradouro}, ${destinatario.bairro}, ${destinatario.localidade}, Brasil`;

    // Criando urls para utilização da api OpenCageData
    const urlRemetente = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(endereco1)}&key=5ce09e25560a4a94829eaa719071dfd7&language=pt&countrycode=br`;
    const urlDestinatario = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(endereco2)}&key=5ce09e25560a4a94829eaa719071dfd7&language=pt&countrycode=br`;

    try {
        // Utiliza a API para buscar geolocalização dos CEPs
        const response1 = await axios.get(urlRemetente);
        const response2 = await axios.get(urlDestinatario);

        // Guarda as informações em uma variável
        const locRemetente = response1.data.results[0];
        const locDestinatario = response2.data.results[0];

        // Se tiver localizado alguma informação do CEP, executa, se não, retorna null
        if (locRemetente && locDestinatario) {

            // Guarda as latitudes e longitudes em variaveis
            const lat1 = locRemetente.geometry.lat;
            const lon1 = locRemetente.geometry.lng;
            const lat2 = locDestinatario.geometry.lat;
            const lon2 = locDestinatario.geometry.lng;

            // Executa função para calcular distância entre um ponto e outro no globo terrestre
            const Raio = 6371;
            const dLat = (lat2 - lat1) * Math.PI / 180;
            const dLon = (lon2 - lon1) * Math.PI / 180;

            const a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);

            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

            // Obtemos a distância em Km
            const distancia = Raio * c;

            // Calculamos o valor por Km
            const valor = Math.round((distancia * 7) / 20)

            // Retornamos o valor
            res.send(valor);

        } else {
            return null;
        }
    } catch (error) {
        console.error('Erro na API:', error.message);
        return null;
    }
}

export default { calcularFrete };