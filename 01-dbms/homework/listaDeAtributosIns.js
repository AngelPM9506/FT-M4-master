Usuairo = {
    id,
    email, 
    password, 
    username, 
    fullname, 
    avatar,
}
posts = {
    id, 
    usrId, 
    type, 
    content,
    description,
    location,
    date
}
likes = {
    id,
    postId, 
    userId,
    date
}
comentarios = {
    id,
    postId,
    userId,
    date,
    content
}
Historias = {
    id, 
    userId,
    description,
    text,
    content
}
favoritos = {
    id, 
    userId,
    postId
}