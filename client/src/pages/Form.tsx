import { useState, FormEvent } from 'react';

interface FormData {
  storeName: string;
  ownerName: string;
  address: string;
  phone: string;
  email: string;
}

interface StampFile {
  file: File | null;
  preview: string;
}

interface BankbookFile {
  file: File | null;
  preview: string;
}

export default function Form() {
  const [formData, setFormData] = useState<FormData>({
    storeName: '',
    ownerName: '',
    address: '',
    phone: '',
    email: '',
  });
  
  const [stampImage, setStampImage] = useState<StampFile>({ file: null, preview: '' });
  const [bankbookImage, setBankbookImage] = useState<BankbookFile>({ file: null, preview: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleStampUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log('[FRONTEND] Stamp image selected:', file.name);
      setStampImage({
        file,
        preview: URL.createObjectURL(file),
      });
    }
  };

  const handleBankbookUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log('[FRONTEND] Bankbook image selected:', file.name);
      setBankbookImage({
        file,
        preview: URL.createObjectURL(file),
      });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    console.log('--- [FRONTEND] Form submission process started ---');
    console.log('[FRONTEND] Form data:', formData);
    
    if (stampImage.file) {
      console.log('[FRONTEND] Stamp image attached:', stampImage.file.name);
    }
    if (bankbookImage.file) {
      console.log('[FRONTEND] Bankbook image attached:', bankbookImage.file.name);
    }

    setIsSubmitting(true);
    setMessage(null);

    try {
      console.log('[FRONTEND] Sending data to /api/stores...');
      
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      const response = await fetch(`${apiUrl}/api/stores`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('[FRONTEND] ✅ Received successful response from /api/stores:', data);
        setMessage({
          type: 'success',
          text: '申請已成功提交！我們會盡快與您聯繫。',
        });
        
        // Reset form
        setFormData({
          storeName: '',
          ownerName: '',
          address: '',
          phone: '',
          email: '',
        });
        setStampImage({ file: null, preview: '' });
        setBankbookImage({ file: null, preview: '' });
      } else {
        console.error('[FRONTEND] ❌ Error response from /api/stores:', data);
        setMessage({
          type: 'error',
          text: data.error || '提交失敗，請稍後再試。',
        });
      }
    } catch (error) {
      console.error('!!! [FRONTEND] Error calling /api/stores:', error);
      setMessage({
        type: 'error',
        text: '網路錯誤，請檢查連線後再試。',
      });
    } finally {
      setIsSubmitting(false);
      console.log('[FRONTEND] Form submission process completed');
    }
  };

  return (
    <div className="form-container">
      <h1>商店合作夥伴申請表單</h1>
      <p className="subtitle">Store Partner Application Form</p>

      {message && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="storeName">
            商店名稱 <span className="required">*</span>
          </label>
          <input
            type="text"
            id="storeName"
            name="storeName"
            value={formData.storeName}
            onChange={handleInputChange}
            required
            placeholder="請輸入商店名稱"
          />
        </div>

        <div className="form-group">
          <label htmlFor="ownerName">
            負責人姓名 <span className="required">*</span>
          </label>
          <input
            type="text"
            id="ownerName"
            name="ownerName"
            value={formData.ownerName}
            onChange={handleInputChange}
            required
            placeholder="請輸入負責人姓名"
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">
            商店地址 <span className="required">*</span>
          </label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
            placeholder="請輸入完整地址"
            rows={3}
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">聯絡電話</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="請輸入聯絡電話"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">電子郵件</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="請輸入電子郵件"
          />
        </div>

        <div className="form-group">
          <label htmlFor="stamp">
            印章圖片 <span className="required">*</span>
          </label>
          <input
            type="file"
            id="stamp"
            accept="image/*"
            onChange={handleStampUpload}
            required
          />
          {stampImage.preview && (
            <div className="image-preview">
              <img src={stampImage.preview} alt="印章預覽" />
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="bankbook">存摺圖片（選填）</label>
          <input
            type="file"
            id="bankbook"
            accept="image/*"
            onChange={handleBankbookUpload}
          />
          {bankbookImage.preview && (
            <div className="image-preview">
              <img src={bankbookImage.preview} alt="存摺預覽" />
            </div>
          )}
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? '提交中...' : '提交申請'}
        </button>
      </form>

      <style>{`
        .form-container {
          max-width: 600px;
          margin: 0 auto;
          padding: 2rem;
        }

        h1 {
          color: #333;
          margin-bottom: 0.5rem;
        }

        .subtitle {
          color: #666;
          margin-bottom: 2rem;
        }

        .message {
          padding: 1rem;
          margin-bottom: 1rem;
          border-radius: 4px;
        }

        .message.success {
          background-color: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
        }

        .message.error {
          background-color: #f8d7da;
          color: #721c24;
          border: 1px solid #f5c6cb;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: #333;
        }

        .required {
          color: #dc3545;
        }

        input[type="text"],
        input[type="tel"],
        input[type="email"],
        textarea {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 1rem;
          box-sizing: border-box;
        }

        textarea {
          resize: vertical;
        }

        input[type="file"] {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid #ddd;
          border-radius: 4px;
        }

        .image-preview {
          margin-top: 1rem;
          max-width: 300px;
        }

        .image-preview img {
          width: 100%;
          height: auto;
          border: 1px solid #ddd;
          border-radius: 4px;
        }

        button {
          width: 100%;
          padding: 1rem;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 1rem;
          cursor: pointer;
          font-weight: 500;
        }

        button:hover:not(:disabled) {
          background-color: #0056b3;
        }

        button:disabled {
          background-color: #6c757d;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}
