import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useAuth } from '../../core/hooks/useAuth';
import { useToast } from '../../core/hooks/useToast';

interface SettingsData {
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
    loanUpdates: boolean;
    paymentReminders: boolean;
    marketing: boolean;
  };
  theme: 'light' | 'dark' | 'system';
  language: string;
}

interface PasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const Settings: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const toast = useToast();

  const [settings, setSettings] = useState<SettingsData>({
    notifications: {
      email: true,
      sms: false,
      push: true,
      loanUpdates: true,
      paymentReminders: true,
      marketing: false,
    },
    theme: 'light',
    language: 'en',
  });

  const [passwordForm, setPasswordForm] = useState<PasswordFormData>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);
  const [activeSection, setActiveSection] = useState<'preferences' | 'notifications' | 'password'>('preferences');

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('borrowerSettings');
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch (error) {
        console.error('Error parsing saved settings:', error);
      }
    }
  }, []);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('borrowerSettings', JSON.stringify(settings));
  }, [settings]);

  const handleNotificationToggle = (key: keyof typeof settings.notifications) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key],
      },
    }));
    toast.success(`${key.replace(/([A-Z])/g, ' $1').trim()} ${!settings.notifications[key] ? 'enabled' : 'disabled'}`);
  };

  const handleThemeChange = (theme: SettingsData['theme']) => {
    setSettings(prev => ({ ...prev, theme }));
    // Apply theme to document
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    toast.success(`Theme changed to ${theme}`);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSettings(prev => ({ ...prev, language: e.target.value }));
    toast.success('Language updated');
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (passwordForm.newPassword.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setIsPasswordLoading(true);
    try {
      // Simulate API call - replace with actual API when ready
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Password changed successfully');
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error) {
      toast.error('Failed to change password. Please check your current password.');
    } finally {
      setIsPasswordLoading(false);
    }
  };

  const handleLogout = async () => {
    if (window.confirm('Are you sure you want to logout?')) {
      try {
        await logout();
        toast.success('Logged out successfully');
        navigate('/login');
      } catch (error) {
        toast.error('Failed to logout');
      }
    }
  };

  const handleSavePreferences = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      toast.success('Preferences saved successfully');
    } catch (error) {
      toast.error('Failed to save preferences');
    } finally {
      setIsLoading(false);
    }
  };

  // Format date safely
  const formatDate = (date: any) => {
    if (!date) return 'N/A';
    try {
      return new Date(date).toLocaleDateString();
    } catch {
      return 'N/A';
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <Button
          variant="primary"
          onClick={handleSavePreferences}
          loading={isLoading}
        >
          Save Preferences
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="md:col-span-1">
          <Card className="sticky top-4">
            <nav className="space-y-1">
              <button
                onClick={() => setActiveSection('preferences')}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === 'preferences'
                    ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300'
                    : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'
                }`}
              >
                ⚙️ Preferences
              </button>
              <button
                onClick={() => setActiveSection('notifications')}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === 'notifications'
                    ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300'
                    : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'
                }`}
              >
                🔔 Notifications
              </button>
              <button
                onClick={() => setActiveSection('password')}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === 'password'
                    ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300'
                    : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'
                }`}
              >
                🔑 Change Password
              </button>
            </nav>
          </Card>
        </div>

        {/* Main Content */}
        <div className="md:col-span-3 space-y-6">
          {/* Preferences Section */}
          {activeSection === 'preferences' && (
            <Card>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Preferences</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Manage your display and application preferences.</p>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-4">
                  {/* Theme Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Theme
                    </label>
                    <div className="flex gap-3">
                      {['light', 'dark', 'system'].map((theme) => (
                        <button
                          key={theme}
                          onClick={() => handleThemeChange(theme as SettingsData['theme'])}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            settings.theme === theme
                              ? 'bg-primary-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                          }`}
                        >
                          {theme.charAt(0).toUpperCase() + theme.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Language Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Language
                    </label>
                    <select
                      value={settings.language}
                      onChange={handleLanguageChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
                    >
                      <option value="en">English</option>
                      <option value="es">Español</option>
                      <option value="fr">Français</option>
                      <option value="pt">Português</option>
                    </select>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Notifications Section */}
          {activeSection === 'notifications' && (
            <Card>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Notification Preferences</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Choose how you want to receive notifications.</p>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-4">
                  {Object.entries(settings.notifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {key === 'email' && 'Receive notifications via email'}
                          {key === 'sms' && 'Receive notifications via SMS'}
                          {key === 'push' && 'Receive push notifications'}
                          {key === 'loanUpdates' && 'Get updates about your loan status'}
                          {key === 'paymentReminders' && 'Receive payment due reminders'}
                          {key === 'marketing' && 'Receive promotional offers and updates'}
                        </p>
                      </div>
                      <button
                        onClick={() => handleNotificationToggle(key as keyof typeof settings.notifications)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          value ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-600'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            value ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          )}

          {/* Change Password Section */}
          {activeSection === 'password' && (
            <Card>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Change Password</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Update your password to keep your account secure.</p>
                </div>

                <form onSubmit={handlePasswordChange} className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-4">
                  <Input
                    label="Current Password"
                    type="password"
                    placeholder="Enter current password"
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                    required
                    autoComplete="current-password"
                  />

                  <Input
                    label="New Password"
                    type="password"
                    placeholder="Enter new password (min 8 characters)"
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                    required
                    autoComplete="new-password"
                  />

                  <Input
                    label="Confirm New Password"
                    type="password"
                    placeholder="Confirm new password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                    required
                    autoComplete="new-password"
                  />

                  <div className="pt-2">
                    <Button
                      type="submit"
                      variant="primary"
                      loading={isPasswordLoading}
                      disabled={isPasswordLoading}
                    >
                      Change Password
                    </Button>
                  </div>
                </form>
              </div>
            </Card>
          )}

          {/* Logout Button */}
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Logout</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Sign out of your account</p>
              </div>
              <Button variant="danger" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </Card>

          {/* User Info Card - Read-only */}
          <Card>
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Account Information</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Name</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {user?.firstName || 'N/A'} {user?.lastName || ''}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Email</p>
                  <p className="font-medium text-gray-900 dark:text-white">{user?.email || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Role</p>
                  <p className="font-medium text-gray-900 dark:text-white capitalize">{user?.role || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Member Since</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {formatDate((user as any)?.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};