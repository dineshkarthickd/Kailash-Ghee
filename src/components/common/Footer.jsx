import { Link } from 'react-router-dom';
import { FiInstagram, FiFacebook, FiTwitter, FiMail, FiPhone } from 'react-icons/fi';

export const Footer = () => {
  return (
    <footer style={{backgroundColor: '#3B1F0A'}}>

      <div style={{
        padding: '24px 16px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>

        {/* MOBILE LAYOUT - single column centered */}
        {/* Hide on desktop */}
        <div className="flex flex-col items-center text-center gap-4 md:hidden">

          {/* Brand */}
          <div style={{display:'flex', flexDirection:'column', alignItems:'center', gap:'6px'}}>
            <h2 style={{
              color: '#D4AF37',
              fontFamily: 'Playfair Display',
              fontSize: '18px',
              fontWeight: 'bold'
            }}>
              Kailash Ghee
            </h2>
            <p style={{
              color: '#FFFFF0',
              fontSize: '11px',
              fontStyle: 'italic'
            }}>
              The Taste of Pure Tradition
            </p>
            <p style={{
              color: 'rgba(255,255,240,0.7)',
              fontSize: '11px',
              maxWidth: '240px',
              textAlign: 'center'
            }}>
              Premium quality pure cow ghee, crafted
              with traditional Bilona methods for
              unparalleled taste and health benefits.
            </p>
            {/* Social Icons */}
            <div style={{
              display: 'flex',
              gap: '12px',
              marginTop: '4px',
              justifyContent: 'center'
            }}>
              <FiInstagram style={{width: '24px', height: '24px', color: '#D4AF37'}} />
              <FiFacebook style={{width: '24px', height: '24px', color: '#D4AF37'}} />
              <FiTwitter style={{width: '24px', height: '24px', color: '#D4AF37'}} />
            </div>
          </div>

          {/* Quick Links */}
          <div style={{display:'flex', flexDirection:'column', alignItems:'center', gap:'6px'}}>
            <h3 style={{
              color: '#D4AF37',
              fontWeight: 'bold',
              fontSize: '13px'
            }}>
              Quick Links
            </h3>
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '6px 20px'
            }}>
              <Link to="/" style={{color:'#FFF8E7', fontSize:'11px'}}>Home</Link>
              <Link to="/products" style={{color:'#FFF8E7', fontSize:'11px'}}>Our Products</Link>
              <Link to="/cart" style={{color:'#FFF8E7', fontSize:'11px'}}>Cart</Link>
              <Link to="/admin" style={{color:'#FFF8E7', fontSize:'11px'}}>Admin Login</Link>
            </div>
          </div>

          {/* Contact */}
          <div style={{display:'flex', flexDirection:'column', alignItems:'center', gap:'6px'}}>
            <h3 style={{
              color: '#D4AF37',
              fontWeight: 'bold',
              fontSize: '13px'
            }}>
              Contact Us
            </h3>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px'
            }}>
              <div style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
                <FiMail style={{color: '#D4AF37'}} />
                <span style={{color:'#FFF8E7', fontSize:'11px'}}>dineshkarthick1610@gmail.com</span>
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
                <FiPhone style={{color: '#D4AF37'}} />
                <span style={{color:'#FFF8E7', fontSize:'11px'}}>+91 7010857596</span>
              </div>
              <p style={{color:'rgba(255,255,240,0.7)', fontSize:'11px', textAlign:'center'}}>
                Chennai, Tamil Nadu, India
              </p>
            </div>
          </div>

        </div>

        {/* DESKTOP LAYOUT - 3 columns */}
        {/* Hide on mobile */}
        <div className="hidden md:grid md:grid-cols-3 md:gap-8 md:items-start">

          {/* Column 1 - Brand */}
          <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start', gap:'8px'}}>
            <h2 style={{
              color: '#D4AF37',
              fontFamily: 'Playfair Display',
              fontSize: '20px',
              fontWeight: 'bold'
            }}>
              Kailash Ghee
            </h2>
            <p style={{
              color: '#FFFFF0',
              fontSize: '12px',
              fontStyle: 'italic'
            }}>
              The Taste of Pure Tradition
            </p>
            <p style={{
              color: 'rgba(255,255,240,0.7)',
              fontSize: '12px',
              maxWidth: '280px',
              textAlign: 'left'
            }}>
              Premium quality pure cow ghee, crafted
              with traditional Bilona methods for
              unparalleled taste and health benefits.
            </p>
            {/* Social Icons */}
            <div style={{
              display: 'flex',
              gap: '12px',
              marginTop: '4px',
              justifyContent: 'flex-start'
            }}>
              <FiInstagram style={{width: '24px', height: '24px', color: '#D4AF37'}} />
              <FiFacebook style={{width: '24px', height: '24px', color: '#D4AF37'}} />
              <FiTwitter style={{width: '24px', height: '24px', color: '#D4AF37'}} />
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div style={{display:'flex', flexDirection:'column', alignItems:'center', gap:'8px', textAlign:'center'}}>
            <h3 style={{
              color: '#D4AF37',
              fontWeight: 'bold',
              fontSize: '14px'
            }}>
              Quick Links
            </h3>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px'
            }}>
              <Link to="/" style={{color:'#FFF8E7', fontSize:'12px'}}>Home</Link>
              <Link to="/products" style={{color:'#FFF8E7', fontSize:'12px'}}>Our Products</Link>
              <Link to="/cart" style={{color:'#FFF8E7', fontSize:'12px'}}>Cart</Link>
              <Link to="/admin" style={{color:'#FFF8E7', fontSize:'12px'}}>Admin Login</Link>
            </div>
          </div>

          {/* Column 3 - Contact */}
          <div style={{display:'flex', flexDirection:'column', alignItems:'flex-end', gap:'8px', textAlign:'right'}}>
            <h3 style={{
              color: '#D4AF37',
              fontWeight: 'bold',
              fontSize: '14px'
            }}>
              Contact Us
            </h3>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              gap: '6px'
            }}>
              <div style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
                <span style={{color:'#FFF8E7', fontSize:'12px'}}>dineshkarthick1610@gmail.com</span>
                <FiMail style={{color: '#D4AF37'}} />
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
                <span style={{color:'#FFF8E7', fontSize:'12px'}}>+91 7010857596</span>
                <FiPhone style={{color: '#D4AF37'}} />
              </div>
              <p style={{color:'rgba(255,255,240,0.7)', fontSize:'12px', textAlign:'right'}}>
                Chennai, Tamil Nadu, India
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* Copyright */}
      <div style={{
        borderTop: '1px solid rgba(212,175,55,0.2)',
        padding: '10px 16px',
        textAlign: 'center'
      }}>
        <p style={{
          color: 'rgba(255,255,240,0.5)',
          fontSize: '11px'
        }}>
          © {new Date().getFullYear()} Kailash Ghee. All rights reserved.
        </p>
      </div>

    </footer>
  );
};

