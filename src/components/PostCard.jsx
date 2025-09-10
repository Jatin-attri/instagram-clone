function PostCard() {
  return (
    <div className="card border-0 mb-4">
      <div className="card-header bg-white d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-2">
          <img src="https://via.placeholder.com/40" className="rounded-circle" />
          <div>
            <strong>joshua_l</strong>
            <div className="text-muted small">Tokyo, Japan</div>
          </div>
        </div>
        <i className="bi bi-three-dots"></i>
      </div>
      <img src="https://via.placeholder.com/360x360" className="card-img-top" alt="Post" />
      <div className="card-body">
        <div className="d-flex gap-3 mb-2">
          <i className="bi bi-heart-fill text-danger"></i>
          <i className="bi bi-chat"></i>
          <i className="bi bi-send"></i>
        </div>
        <p className="mb-1"><strong>Liked by craig_love and 44,686 others</strong></p>
        <p><strong>joshua_l</strong> The game in Japan was amazing and I want to share some photos.</p>
      </div>
    </div>
  );
}
export default PostCard;
