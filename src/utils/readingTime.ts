const WORDS_PER_MINUTE = 200;

/** Calcula o tempo estimado de leitura a partir do corpo bruto (Markdown/MDX) de um post. */
export function getReadingTime(body: string): string {
	const plainText = body
		.replace(/```[\s\S]*?```/g, ' ') // blocos de código
		.replace(/`[^`]*`/g, ' ') // código inline
		.replace(/^import .*$/gm, ' ') // imports de componentes (MDX)
		.replace(/<[^>]+>/g, ' ') // tags HTML/JSX (ex: <ConfusionMatrixDemo />)
		.replace(/!\[[^\]]*\]\([^)]*\)/g, ' ') // imagens
		.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // links, mantém o texto
		.replace(/^#{1,6}\s+/gm, '') // headers
		.replace(/[*_~>#-]/g, ' ') // marcações de ênfase/lista/citação
		.trim();

	const words = plainText.split(/\s+/).filter(Boolean).length;
	const minutes = Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));

	return `${minutes} min de leitura`;
}
