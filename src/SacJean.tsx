import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { basketStorage } from './basketStorage'

const SacJean = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const navigate = useNavigate()

  const handleAddToBasket = (productType: 'genou' | 'fesses') => {
    const products = {
      genou: {
        id: 1,
        name: "Sac Genou",
        price: 20.00,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?w=400&h=400&fit=crop"
      },
      fesses: {
        id: 2,
        name: "Sac Fesses",
        price: 20.00,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop"
      }
    }

    basketStorage.addItem(products[productType])
    navigate('/cart')
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#2C77DA',
      fontFamily: 'Oswald, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px',
      position: 'relative'
    }}>
      <button 
        onClick={() => navigate('/')}
        style={{
          position: 'absolute',
          top: '40px',
          left: '40px',
          color: '#F0BD0E',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          display: 'flex',
          alignItems: 'center',
          transition: 'all 0.2s ease',
          zIndex: 10
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = '#ffffff'
          e.currentTarget.style.transform = 'translateX(-3px)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = '#F0BD0E'
          e.currentTarget.style.transform = 'translateX(0)'
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </button>

      <h1 style={{
        fontSize: '64px',
        fontWeight: 'bold',
        color: '#F0BD0E',
        marginBottom: '60px',
        textAlign: 'center'
      }}>
        Choisissez Votre Sac
      </h1>

      <div style={{
        display: 'flex',
        gap: '40px',
        maxWidth: '1400px',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        {/* Sac Genou Card */}
        <div
          onMouseEnter={() => setHoveredCard('genou')}
          onMouseLeave={() => setHoveredCard(null)}
          onClick={() => hoveredCard === 'genou' && handleAddToBasket('genou')}
          style={{
            background: '#154C94',
            borderRadius: '24px',
            padding: '40px',
            cursor: 'pointer',
            border: '2px solid rgba(240, 189, 14, 0.3)',
            boxShadow: '0 8px 24px rgba(0, 18, 72, 0.3)',
            width: '400px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative',
            overflow: 'hidden',
            height: '500px',
          }}
        >
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            opacity: 0.05,
            background: `repeating-linear-gradient(45deg, #F0BD0E, #F0BD0E 10px, transparent 10px, transparent 20px)`
          }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{ fontSize: '48px', fontWeight: 'bold', color: '#F0BD0E', marginBottom: '20px' }}>
              Sac Genou
            </h2>
            <p style={{ fontSize: '18px', color: '#ffffff', lineHeight: '1.6', opacity: 0.7 }}>
              Un sac compact et élégant, parfait pour transporter l'essentiel avec style. 
              Fabriqué à partir de denim recyclé de haute qualité.
            </p>
          </div>

          <div style={{
            position: 'relative',
            zIndex: 1,
            borderTop: '2px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '20px',
            marginTop: '20px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '40px', fontWeight: 'bold', color: '#F0BD0E' }}>
                $20.00
              </span>
              <div style={{
                padding: '12px 24px',
                background: hoveredCard === 'genou' ? '#F0BD0E' : 'rgba(240, 189, 14, 0.2)',
                color: hoveredCard === 'genou' ? '#001248' : '#F0BD0E',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '600',
                transition: 'all 0.4s ease',
                border: hoveredCard === 'genou' ? 'none' : '2px solid #F0BD0E'
              }}>
                {hoveredCard === 'genou' ? 'Acheter →' : 'Voir plus'}
              </div>
            </div>
          </div>
        </div>

        {/* Sac Fesses Card */}
        <div
          onMouseEnter={() => setHoveredCard('fesses')}
          onMouseLeave={() => setHoveredCard(null)}
          onClick={() => hoveredCard === 'fesses' && handleAddToBasket('fesses')}
          style={{
            background: '#154C94',
            borderRadius: '24px',
            padding: '40px',
            cursor: 'pointer',
            border: '2px solid rgba(240, 189, 14, 0.3)',
            boxShadow: '0 8px 24px rgba(0, 18, 72, 0.3)',
            width: '400px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative',
            overflow: 'hidden',
            height: '500px',
          }}
        >
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            opacity: 0.05,
            background: `repeating-linear-gradient(-45deg, #F0BD0E, #F0BD0E 10px, transparent 10px, transparent 20px)`
          }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{ fontSize: '48px', fontWeight: 'bold', color: '#F0BD0E', marginBottom: '20px' }}>
              Sac Fesses
            </h2>
            <p style={{ fontSize: '18px', color: '#ffffff', lineHeight: '1.6', opacity: 0.7 }}>
              Un sac audacieux et authentique qui réutilise les poches et la ceinture de jeans vintage. Fabriqué à la main avec du denim recyclé pour un look urbain unique.
            </p>
          </div>

          <div style={{
            position: 'relative',
            zIndex: 1,
            borderTop: '2px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '20px',
            marginTop: '20px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '40px', fontWeight: 'bold', color: '#F0BD0E' }}>
                $20.00
              </span>
              <div style={{
                padding: '12px 24px',
                background: hoveredCard === 'fesses' ? '#F0BD0E' : 'rgba(240, 189, 14, 0.2)',
                color: hoveredCard === 'fesses' ? '#001248' : '#F0BD0E',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '600',
                transition: 'all 0.4s ease',
                border: hoveredCard === 'fesses' ? 'none' : '2px solid #F0BD0E'
              }}>
                {hoveredCard === 'fesses' ? 'Acheter →' : 'Voir plus'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SacJean