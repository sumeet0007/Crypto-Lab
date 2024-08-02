// src/components/CryptoCard.js

export default function CryptoCard({ crypto, onClick }) {
    const { id, name, current_price, image } = crypto;
  
    return (
      <div className="crypto-card" onClick={onClick}>
        <img src={image} alt={name} className="crypto-logo" />
        <h3>{name}</h3>
        <p>${current_price.toFixed(2)}</p>
      </div>
    );
  }
  