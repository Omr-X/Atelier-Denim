import{ useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

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
  const [checkoutHover, setCheckoutHover] = useState(false)

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

  const handlePayPalCheckout = () => {
    if (basketItems.length === 0) {
      alert('Your basket is empty');
      return;
    }

    const form = document.createElement('form');
    form.action = 'https://www.paypal.com/cgi-bin/webscr';
    form.method = 'POST';
    form.target = '_blank';

    const fields: Record<string, string> = {
      'cmd': '_cart',
      'upload': '1',
      'business': 'omarbasfaou@gmail.com',
      'currency_code': 'CAD',
      'return': window.location.href,
      'cancel_return': window.location.href
    };

    basketItems.forEach((item, index) => {
      const i = index + 1;
      fields[`item_name_${i}`] = item.name;
      fields[`amount_${i}`] = item.price.toFixed(2);
      fields[`quantity_${i}`] = item.quantity.toString();
    });

    Object.keys(fields).forEach(key => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = fields[key];
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  }
  
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

            <button
              onMouseEnter={() => setCheckoutHover(true)}
              onMouseLeave={() => setCheckoutHover(false)}
              disabled={basketItems.length === 0}
              onClick={handlePayPalCheckout}
              style={{
                width: '100%',
                padding: '16px',
                background: basketItems.length === 0 
                  ? 'rgba(240, 189, 14, 0.3)' 
                  : (checkoutHover ? '#D7A600' : '#F0BD0E'),
                color: '#001248',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: basketItems.length === 0 ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease',
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                opacity: basketItems.length === 0 ? 0.5 : 1
              }}
            >
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.067 8.478c.492.88.556 2.014.3 3.327-.74 3.806-3.276 5.12-6.514 5.12h-.5a.805.805 0 00-.794.68l-.04.22-.63 3.993-.032.17a.804.804 0 01-.794.679H7.72a.483.483 0 01-.477-.558L7.418 21h1.518l.95-6.02h1.385c4.678 0 7.75-2.203 8.796-6.502z"/>
                <path d="M2.379 5.479C3.527 1.918 5.51.454 9.455.454h5.159c.936 0 1.817.194 2.584.568.532.26.968.591 1.297.992.17.206.31.428.422.666.226.476.355 1.004.39 1.586L19.5 5.6c0-.084-.002-.168-.007-.253.492.88.556 2.014.3 3.327-.74 3.806-3.276 5.12-6.514 5.12h-.5a.805.805 0 00-.794.68l-.04.22-.63 3.993-.032.17a.804.804 0 01-.794.679H7.72a.483.483 0 01-.477-.558l.176-1.11.95-6.019 1.385.001c4.678 0 7.75-2.203 8.796-6.503z"/>
              </svg>
              Pay with PayPal
            </button>

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
                transition: 'all 0.2s ease'
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