import { Modal } from '@contentful/f36-components';

interface PrevieModalProps {
  id?: string;
  onClose: () => void;
}

const PreviewModal = ({ id, onClose }: PrevieModalProps) => {
  return (
    <Modal modalContentProps={{ className: '!p-0' }} isShown onClose={onClose}>
      <iframe
        title="preview"
        width="520"
        height="293"
        src={`https://www.youtube.com/embed/${id}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </Modal>
  );
};

export default PreviewModal;
