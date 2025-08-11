const ConnectionCard = ({ request, children }) => {
    const user = request;
    if (!request) return;

    return (
        <div className="card card-dash bg-base-300 w-96">
            <div className="card-body">
                <div className="flex justify-between">
                    <div className="flex items-center gap-5">
                        <div className="w-10 h-10 rounded">
                            <img className="w-full object-cover" alt="profile" src={user.photoUrl}></img>
                        </div>
                        <div>
                            <h2 className="card-title">{user.firstName}</h2>
                            <span>{user.age}</span>
                            <span>{user.age ? ", " + user.gender : user.gender}</span>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default ConnectionCard;
