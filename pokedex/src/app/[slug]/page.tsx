export default function Page({ params }: { params: { slug: number } }) {
    return <div>My Post: {params.slug}</div>
}