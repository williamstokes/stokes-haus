// Antimemetic Poetics - Encryption, Decryption, and Attempt Tracking

// Generate or retrieve user ID for tracking
function getUserId() {
    const userIdKey = 'antimemetic_user_id';
    let userId = getStoredValue(userIdKey);
    
    if (!userId) {
        // Generate a unique user ID (timestamp + random)
        userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        setStoredValue(userIdKey, userId);
    }
    
    return userId;
}

// Track password attempt event
function trackPasswordAttempt(poemId, isCorrect, attemptCount, maxAttempts, passwordAttempt) {
    // Wait for gtag to be available
    if (typeof gtag === 'undefined') {
        console.warn('gtag not available for tracking - will retry');
        // Retry after a short delay
        setTimeout(() => trackPasswordAttempt(poemId, isCorrect, attemptCount, maxAttempts, passwordAttempt), 100);
        return;
    }
    
    const userId = getUserId();
    const eventName = isCorrect ? 'password_success' : 'password_attempt';
    
    // Store password attempt in local log
    const logEntry = {
        timestamp: new Date().toISOString(),
        poemId: poemId,
        userId: userId,
        passwordAttempt: passwordAttempt || '',
        isCorrect: isCorrect,
        attemptCount: attemptCount,
        maxAttempts: maxAttempts
    };
    
    // Store in localStorage for viewing
    const logKey = 'antimemetic_password_logs';
    let logs = [];
    try {
        const storedLogs = localStorage.getItem(logKey);
        if (storedLogs) {
            logs = JSON.parse(storedLogs);
        }
        logs.push(logEntry);
        // Keep only last 1000 entries to avoid storage issues
        if (logs.length > 1000) {
            logs = logs.slice(-1000);
        }
        localStorage.setItem(logKey, JSON.stringify(logs));
    } catch (error) {
        console.error('Error storing password log:', error);
    }
    
    // Track global success/failure counts
    const globalStatsKey = 'antimemetic_global_stats';
    try {
        let globalStats = {
            totalAttempts: 0,
            totalSuccesses: 0
        };
        const storedStats = localStorage.getItem(globalStatsKey);
        if (storedStats) {
            globalStats = JSON.parse(storedStats);
        }
        globalStats.totalAttempts += 1;
        if (isCorrect) {
            globalStats.totalSuccesses += 1;
        }
        localStorage.setItem(globalStatsKey, JSON.stringify(globalStats));
    } catch (error) {
        console.error('Error storing global stats:', error);
    }
    
    // Truncate password for GA (max 100 chars per parameter)
    const passwordForGA = passwordAttempt ? passwordAttempt.substring(0, 100) : '';
    
    const eventParams = {
        'poem_id': String(poemId),
        'user_id': userId,
        'attempt_count': attemptCount,
        'max_attempts': maxAttempts,
        'is_correct': isCorrect,
        'remaining_attempts': maxAttempts - attemptCount,
        'password_attempt': passwordForGA
    };
    
    console.log('Tracking event:', eventName, eventParams);
    console.log('Password attempt logged:', passwordAttempt);
    
    try {
        gtag('event', eventName, eventParams);
        console.log('Event sent successfully');
    } catch (error) {
        console.error('Error sending event:', error);
    }
}

// Track password attempts exceeded
function trackAttemptsExceeded(poemId) {
    if (typeof gtag === 'undefined') {
        console.warn('gtag not available for tracking - will retry');
        setTimeout(() => trackAttemptsExceeded(poemId), 100);
        return;
    }
    
    const userId = getUserId();
    
    const eventParams = {
        'poem_id': String(poemId),
        'user_id': userId
    };
    
    console.log('Tracking event: password_attempts_exceeded', eventParams);
    
    try {
        gtag('event', 'password_attempts_exceeded', eventParams);
        console.log('Event sent successfully');
    } catch (error) {
        console.error('Error sending event:', error);
    }
}

// Track poem decryption success
function trackPoemDecrypted(poemId) {
    if (typeof gtag === 'undefined') {
        console.warn('gtag not available for tracking - will retry');
        setTimeout(() => trackPoemDecrypted(poemId), 100);
        return;
    }
    
    const userId = getUserId();
    
    const eventParams = {
        'poem_id': String(poemId),
        'user_id': userId
    };
    
    console.log('Tracking event: poem_decrypted', eventParams);
    
    try {
        gtag('event', 'poem_decrypted', eventParams);
        console.log('Event sent successfully');
    } catch (error) {
        console.error('Error sending event:', error);
    }
}

// View password attempt logs
function viewPasswordLogs(poemId = null) {
    const logKey = 'antimemetic_password_logs';
    try {
        const storedLogs = localStorage.getItem(logKey);
        if (!storedLogs) {
            console.log('No password logs found');
            return [];
        }
        
        let logs = JSON.parse(storedLogs);
        
        // Filter by poem ID if specified
        if (poemId !== null) {
            logs = logs.filter(log => log.poemId === poemId);
        }
        
        // Sort by timestamp (newest first)
        logs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        
        console.log('=== PASSWORD ATTEMPT LOGS ===');
        console.log(`Total entries: ${logs.length}`);
        if (poemId !== null) {
            console.log(`Filtered for Poem ${poemId}`);
        }
        console.log('---');
        logs.forEach((log, index) => {
            console.log(`${index + 1}. [${log.timestamp}] Poem ${log.poemId} | User: ${log.userId} | Password: "${log.passwordAttempt}" | Correct: ${log.isCorrect} | Attempt ${log.attemptCount}/${log.maxAttempts}`);
        });
        console.log('=== END LOGS ===');
        
        return logs;
    } catch (error) {
        console.error('Error reading password logs:', error);
        return [];
    }
}

// Export viewPasswordLogs to window for console access
if (typeof window !== 'undefined') {
    window.viewPasswordLogs = viewPasswordLogs;
}

// Get global success rate statistics
function getGlobalSuccessRate() {
    const globalStatsKey = 'antimemetic_global_stats';
    try {
        const storedStats = localStorage.getItem(globalStatsKey);
        if (!storedStats) {
            return { totalAttempts: 0, totalSuccesses: 0, percentage: 0 };
        }
        
        const stats = JSON.parse(storedStats);
        const percentage = stats.totalAttempts > 0 
            ? (stats.totalSuccesses / stats.totalAttempts * 100).toFixed(1)
            : 0;
        
        return {
            totalAttempts: stats.totalAttempts,
            totalSuccesses: stats.totalSuccesses,
            percentage: percentage
        };
    } catch (error) {
        console.error('Error reading global stats:', error);
        return { totalAttempts: 0, totalSuccesses: 0, percentage: 0 };
    }
}

// Update global success rate display
function updateGlobalSuccessRate() {
    const stats = getGlobalSuccessRate();
    const successRateElement = document.getElementById('global-success-rate');
    if (successRateElement) {
        if (stats.totalAttempts > 0) {
            successRateElement.textContent = 
                `Global success rate: ${stats.percentage}% (${stats.totalSuccesses}/${stats.totalAttempts})`;
        } else {
            successRateElement.textContent = 'Global success rate: No attempts yet';
        }
    }
}

// Track poem forgotten (when user clicks forget button)
function trackPoemForgotten(poemId) {
    if (typeof gtag === 'undefined') {
        console.warn('gtag not available for tracking - will retry');
        setTimeout(() => trackPoemForgotten(poemId), 100);
        return;
    }
    
    const userId = getUserId();
    
    const eventParams = {
        'poem_id': String(poemId),
        'user_id': userId
    };
    
    console.log('Tracking event: poem_forgotten', eventParams);
    
    try {
        gtag('event', 'poem_forgotten', eventParams);
        console.log('Event sent successfully');
    } catch (error) {
        console.error('Error sending event:', error);
    }
}

// Get Eastern time date string (YYYY-MM-DD)
function getEasternDate() {
    const now = new Date();
    const easternDate = new Date(now.toLocaleString("en-US", { timeZone: "America/New_York" }));
    const year = easternDate.getFullYear();
    const month = String(easternDate.getMonth() + 1).padStart(2, '0');
    const day = String(easternDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Storage management (using localStorage instead of cookies for file:// protocol compatibility)
function getStoredValue(name) {
    try {
        return localStorage.getItem(name);
    } catch (e) {
        return null;
    }
}

function setStoredValue(name, value) {
    try {
        localStorage.setItem(name, value);
    } catch (e) {
        // Storage quota exceeded or disabled
        console.error('Failed to save to localStorage:', e);
    }
}

function removeStoredValue(name) {
    try {
        localStorage.removeItem(name);
    } catch (e) {
        console.error('Failed to remove from localStorage:', e);
    }
}

// Get attempt tracking data for a poem
function getAttemptData(poemId) {
    const storageName = `antimemetic_attempts_${poemId}`;
    const storedValue = getStoredValue(storageName);
    
    if (!storedValue) {
        return { count: 0, date: getEasternDate(), poemId: poemId };
    }
    
    try {
        const data = JSON.parse(storedValue);
        const currentDate = getEasternDate();
        
        // Reset if date changed (new day in Eastern time)
        if (data.date !== currentDate) {
            return { count: 0, date: currentDate, poemId: poemId };
        }
        
        return data;
    } catch (e) {
        return { count: 0, date: getEasternDate(), poemId: poemId };
    }
}

// Save attempt data
function saveAttemptData(poemId, count) {
    const storageName = `antimemetic_attempts_${poemId}`;
    const data = {
        count: count,
        date: getEasternDate(),
        poemId: poemId
    };
    const storageValue = JSON.stringify(data);
    setStoredValue(storageName, storageValue);
}

// Increment attempt count
function incrementAttempts(poemId) {
    const data = getAttemptData(poemId);
    data.count++;
    saveAttemptData(poemId, data.count);
    return data.count;
}

// Reset attempts (on successful password)
function resetAttempts(poemId) {
    const storageName = `antimemetic_attempts_${poemId}`;
    removeStoredValue(storageName);
}

// Check if attempts exceeded
function isAttemptsExceeded(poemId) {
    const data = getAttemptData(poemId);
    const maxAttempts = poemId * 10;
    return data.count >= maxAttempts;
}

// Get remaining attempts
function getRemainingAttempts(poemId) {
    const data = getAttemptData(poemId);
    const maxAttempts = poemId * 10;
    return Math.max(0, maxAttempts - data.count);
}

// Derive key from password using PBKDF2
async function deriveKey(password, salt) {
    const encoder = new TextEncoder();
    const passwordKey = await crypto.subtle.importKey(
        'raw',
        encoder.encode(password),
        'PBKDF2',
        false,
        ['deriveBits', 'deriveKey']
    );
    
    const key = await crypto.subtle.deriveKey(
        {
            name: 'PBKDF2',
            salt: salt,
            iterations: 100000,
            hash: 'SHA-256'
        },
        passwordKey,
        { name: 'AES-GCM', length: 256 },
        false,
        ['encrypt', 'decrypt']
    );
    
    return key;
}

// Decrypt poem content
async function decryptPoem(encryptedBase64, password) {
    try {
        // Decode base64
        const encryptedData = Uint8Array.from(atob(encryptedBase64), c => c.charCodeAt(0));
        
        // Extract components: salt (16) + nonce/iv (12) + [ciphertext + authTag]
        // Python's AESGCM.encrypt() returns ciphertext with authTag appended
        const salt = encryptedData.slice(0, 16);
        const iv = encryptedData.slice(16, 28); // 12 bytes for GCM IV
        const ciphertextWithTag = encryptedData.slice(28); // Rest is ciphertext + authTag (authTag is last 16 bytes)
        
        // Derive key from password
        const key = await deriveKey(password, salt);
        
        // Decrypt (ciphertextWithTag already has authTag appended)
        const decrypted = await crypto.subtle.decrypt(
            {
                name: 'AES-GCM',
                iv: iv,
                tagLength: 128 // 16 bytes = 128 bits
            },
            key,
            ciphertextWithTag
        );
        
        // Convert to text
        const decoder = new TextDecoder();
        const result = decoder.decode(decrypted);
        return result;
    } catch (error) {
        throw new Error('Decryption failed - incorrect password or corrupted data');
    }
}

// Encrypt poem content (for creating encrypted files)
async function encryptPoem(plaintext, password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(plaintext);
    
    // Generate random salt and IV
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const iv = crypto.getRandomValues(new Uint8Array(12));
    
    // Derive key from password
    const key = await deriveKey(password, salt);
    
    // Encrypt
    const encrypted = await crypto.subtle.encrypt(
        {
            name: 'AES-GCM',
            iv: iv,
            tagLength: 128
        },
        key,
        data
    );
    
    // Web Crypto API returns ciphertext with authTag already appended
    // Format matches Python's AESGCM.encrypt(): salt + iv + [ciphertext + authTag]
    const encryptedArray = new Uint8Array(encrypted);
    
    // Combine: salt (16) + iv (12) + [ciphertext + authTag]
    const combined = new Uint8Array(salt.length + iv.length + encryptedArray.length);
    combined.set(salt, 0);
    combined.set(iv, salt.length);
    combined.set(encryptedArray, salt.length + iv.length);
    
    // Convert to base64
    return btoa(String.fromCharCode(...combined));
}

// Export for use in Node.js encryption script
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { encryptPoem };
}

