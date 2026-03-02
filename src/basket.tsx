import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { PayPalButtons } from '@paypal/react-paypal-js'

type BasketItem = {
  id: number
  name: string
  price: number
  quantity: number
}

const basket = () => {
  const BASKET_KEY = 'userBasket';
  const navigate = useNavigate();
  
  const [basketItems, setBasketItems] = useState<BasketItem[]>(() => {
    const stored = localStorage.getItem(BASKET_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  const [hoveredId, setHoveredId] = useState<number | null>(null)

  useEffect(() => {
    localStorage.setItem(BASKET_KEY, JSON.stringify(basketItems));
  }, [basketItems]);

  const updateQuantity = (id: number, change: number) => {
    setBasketItems(basketItems.map(item => 
      item.id === id 
        ? { ...item, quantity: Math.max(1, item.quantity + change) }
        : item
    ))
  }

  const removeItem = (id: number) => {
    setBasketItems(basketItems.filter(item => item.id !== id))
  }

  const clearBasket = () => {
    setBasketItems([])
    localStorage.removeItem(BASKET_KEY)
  }

  const total = basketItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  return (
    <div style={{ 
      minHeight: '100vh',
      background: '#2C77DA',
      fontFamily: 'Oswald, sans-serif'
    }}>
      
      <div style={{ 
        display: 'flex',
        gap: '40px',
        padding: '40px', 
        maxWidth: '1400px', 
        margin: '0 auto',
        position: 'relative'
      }}>
        <div style={{ flex: '2.5' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '40px' }}>
            <button 
              onClick={() => navigate('/')}
              style={{
                color: '#F0BD0E',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                transition: 'all 0.2s ease'
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
            <h1 style={{ margin: 0, fontSize: '42px', fontWeight: 'bold', color: '#001248' }}>
              Your Basket
            </h1>
          </div>

          <div style={{
            background: 'rgba(240, 189, 14, 0.15)',
            border: '1px solid rgba(240, 189, 14, 0.5)',
            borderRadius: '12px',
            padding: '16px 24px',
            margin: '24px 40px 40px 40px',
            color: '#F0BD0E',
            fontSize: '16px',
            textAlign: 'center'
          }}>
            * Après votre achat, nous vous contacterons rapidement pour vous tenir au courant du processus fabrication et pour convenir d'un lieu de remise.
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {basketItems.length === 0 ? (
              <div style={{
                padding: '60px',
                background: '#154C94',
                borderRadius: '12px',
                textAlign: 'center',
                color: '#ffffff'
              }}>
                <p style={{ fontSize: '20px', margin: 0 }}>Your basket is empty</p>
              </div>
            ) : (
              basketItems.map((item) => (
                <div 
                  key={item.id}
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '24px',
                    padding: '24px',
                    background: '#154C94',
                    borderRadius: '12px',
                    transition: 'all 0.2s ease',
                    transform: hoveredId === item.id ? 'translateY(-2px)' : 'translateY(0)',
                    boxShadow: hoveredId === item.id 
                      ? '0 8px 24px rgba(0, 18, 72, 0.5)' 
                      : '0 2px 8px rgba(0, 18, 72, 0.3)',
                    border: '1px solid rgba(240, 189, 14, 0.2)'
                  }}
                >
                  <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '600', color: '#F0BD0E', flex: 1 }}>
                    {item.name}
                  </h3>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        background: 'rgba(0, 18, 72, 0.3)',
                        color: '#ffffff',
                        cursor: 'pointer',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#F0BD0E'
                        e.currentTarget.style.background = 'rgba(240, 189, 14, 0.2)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)'
                        e.currentTarget.style.background = 'rgba(0, 18, 72, 0.3)'
                      }}
                    >
                      −
                    </button>
                    
                    <span style={{ fontSize: '16px', fontWeight: '600', minWidth: '32px', textAlign: 'center', color: '#ffffff' }}>
                      {item.quantity}
                    </span>
                    
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        background: 'rgba(0, 18, 72, 0.3)',
                        color: '#ffffff',
                        cursor: 'pointer',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#F0BD0E'
                        e.currentTarget.style.background = 'rgba(240, 189, 14, 0.2)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)'
                        e.currentTarget.style.background = 'rgba(0, 18, 72, 0.3)'
                      }}
                    >
                      +
                    </button>
                  </div>
                
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px', minWidth: '140px' }}>
                    <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#F0BD0E' }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                    
                    <button
                      onClick={() => removeItem(item.id)}
                      style={{
                        padding: '8px 16px',
                        borderRadius: '8px',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        background: 'rgba(0, 18, 72, 0.3)',
                        color: '#ffffff',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        transition: 'all 0.2s ease',
                        fontSize: '14px',
                        fontWeight: '500'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#dc2626'
                        e.currentTarget.style.background = 'rgba(220, 38, 38, 0.2)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)'
                        e.currentTarget.style.background = 'rgba(0, 18, 72, 0.3)'
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                      </svg>
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div style={{ flex: '1', position: 'sticky', top: '40px', height: 'fit-content' }}>
          <div style={{
            padding: '32px',
            background: '#154C94',
            borderRadius: '12px',
            boxShadow: '0 4px 16px rgba(0, 18, 72, 0.3)',
            border: '1px solid rgba(240, 189, 14, 0.3)'
          }}>
            <h2 style={{ margin: '0 0 24px 0', fontSize: '28px', fontWeight: 'bold', color: '#F0BD0E' }}>
              Summary
            </h2>
            
            <div style={{ marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', color: 'rgba(255, 255, 255, 0.8)', fontWeight: '500' }}>
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#ffffff' }}>Total</span>
              <span style={{ fontSize: '28px', fontWeight: 'bold', color: '#F0BD0E' }}>
                ${total.toFixed(2)}
              </span>
            </div>

            {/* CHANGED: added forceReRender, onCancel, onError */}
            {basketItems.length > 0 && (
              <PayPalButtons
                style={{ layout: 'horizontal', color: 'gold', shape: 'rect', label: 'pay' }}
                forceReRender={[total]}
                createOrder={(_data, actions) => {
                  return actions.order.create({
                    intent: 'CAPTURE',
                    purchase_units: [{
                      amount: {
                        currency_code: 'CAD',
                        value: total.toFixed(2),
                        breakdown: {
                          item_total: { currency_code: 'CAD', value: total.toFixed(2) }
                        }
                      },
                      items: basketItems.map(item => ({
                        name: item.name,
                        unit_amount: { currency_code: 'CAD', value: item.price.toFixed(2) },
                        quantity: item.quantity.toString()
                      }))
                    }]
                  })
                }}
                onApprove={(_data, actions) => {
                  return actions.order!.capture().then(() => {
                    clearBasket()
                    alert('Payment successful! We will contact you shortly.')
                  })
                }}
                onCancel={() => alert('Payment cancelled.')}
                onError={(err) => {
                  console.error('PayPal error:', err)
                  alert('Something went wrong with PayPal. Please try again.')
                }}
              />
            )}

            <button
              onClick={clearBasket}
              style={{
                width: '100%',
                padding: '12px',
                background: 'rgba(220, 38, 38, 0.2)',
                color: '#ffffff',
                border: '1px solid rgba(220, 38, 38, 0.5)',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                marginTop: '12px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(220, 38, 38, 0.3)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(220, 38, 38, 0.2)'
              }}
            >
              Clear Basket
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default basket