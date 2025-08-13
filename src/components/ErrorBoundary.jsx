// src/components/ErrorBoundary.jsx
import React from 'react';

class ErrorBoundary extends React.Component {
    state = { hasError: false };

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    render() {
        return this.state.hasError
            ? <p style={{ color: 'var(--secondary)' }}>Video could not be loaded.</p>
            : this.props.children;
    }
}

export default ErrorBoundary;