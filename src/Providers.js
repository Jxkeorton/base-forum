import { CurrentUserProvider } from "./contexts/CurrentUserContext";
import { ModalProvider } from "./contexts/ReviewModalContext";
import { ProfileProvider } from "./contexts/ProfileContext";
import { SavedLocationsProvider } from "./contexts/SavedLocationsContext";
import { ReviewsProvider } from "./contexts/ReviewsContext";
import { ToastProvider } from "./contexts/ToastContext";

const Providers = ({ children }) => {
    return (
      <CurrentUserProvider>
        <ToastProvider>
          <ProfileProvider>
            <ReviewsProvider>
              <SavedLocationsProvider>
                <ModalProvider>
                  {children}
                </ModalProvider>
              </SavedLocationsProvider>
            </ReviewsProvider>
          </ProfileProvider>
        </ToastProvider>
      </CurrentUserProvider>
    );
  };

export default Providers;